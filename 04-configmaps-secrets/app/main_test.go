package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestLoadConfigFromEnv(t *testing.T) {
	t.Setenv("APP_ENV", "development")
	t.Setenv("LOG_LEVEL", "debug")
	t.Setenv("DB_USERNAME", "admin")
	t.Setenv("DB_PASSWORD", "s3cret")

	c := loadConfig()

	if c.AppEnv != "development" || c.LogLevel != "debug" || c.DBUsername != "admin" {
		t.Fatalf("unexpected config: %+v", c)
	}
	if !c.PasswordSet {
		t.Fatal("expected PasswordSet to be true")
	}
}

func TestLoadConfigDefaults(t *testing.T) {
	c := loadConfig()

	if c.AppEnv != "local" || c.LogLevel != "info" {
		t.Fatalf("unexpected defaults: %+v", c)
	}
	if c.PasswordSet {
		t.Fatal("expected PasswordSet to be false")
	}
}

func TestRootDoesNotLeakPassword(t *testing.T) {
	mux := newMux(config{AppEnv: "test", DBPassword: "s3cret", PasswordSet: true})
	rec := httptest.NewRecorder()

	mux.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/", nil))

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200", rec.Code)
	}
	if strings.Contains(rec.Body.String(), "s3cret") {
		t.Fatal("response leaks the password")
	}
	var got map[string]any
	if err := json.Unmarshal(rec.Body.Bytes(), &got); err != nil {
		t.Fatal(err)
	}
	if got["app_env"] != "test" || got["db_password_set"] != true {
		t.Fatalf("unexpected body: %v", got)
	}
}

func TestHealthz(t *testing.T) {
	rec := httptest.NewRecorder()

	newMux(config{}).ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/healthz", nil))

	if rec.Code != http.StatusOK || rec.Body.String() != "ok" {
		t.Fatalf("got %d %q", rec.Code, rec.Body.String())
	}
}
