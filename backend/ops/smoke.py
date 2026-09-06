"""Run inside the API container; removes only the record created by this check."""
import json
import os
import uuid
from urllib.request import Request, urlopen
from urllib.error import HTTPError

from database import SessionLocal, GameCompletion

base = os.environ.get("TEST_API_URL", "http://127.0.0.1:8000")
origin = os.environ["CORS_ORIGINS"].split(",")[0].strip()

def request(path, method="GET", data=None, headers=None):
    req = Request(base + path, method=method,
                  data=json.dumps(data).encode() if data is not None else None,
                  headers={"Origin": origin, "Content-Type": "application/json", **(headers or {})})
    with urlopen(req, timeout=15) as response:
        assert response.headers.get("Access-Control-Allow-Origin") == origin
        body = response.read()
        return json.loads(body) if body and method != "OPTIONS" else None

assert request("/api/health")["status"] == "ok"
request("/api/game-completions", "OPTIONS", headers={
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "content-type",
})
name = "Smoke-" + uuid.uuid4().hex[:10]
try:
    record = request("/api/game-completions", "POST", {
        "player_name": name, "completion_time": 123456, "moves": 40,
    })
    assert record["player_name"] == name and record["rank"] >= 1
    assert any(row["id"] == record["id"] for row in request("/api/game-completions/leaderboard"))
    assert request("/api/game-completions/rank?completion_time=123456")["rank"] == record["rank"]
    try:
        request("/api/game-completions", "POST", {
            "player_name": name, "completion_time": -1, "moves": 0,
        })
        raise AssertionError("Invalid input was accepted")
    except HTTPError as error:
        assert error.code == 422
finally:
    with SessionLocal() as db:
        db.query(GameCompletion).filter(GameCompletion.player_name == name).delete()
        db.commit()
print("PASS: health, CORS preflight, save, leaderboard, rank, validation; test record removed")
