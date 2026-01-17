package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type config struct {
	AppEnv      string `json:"app_env"`
	LogLevel    string `json:"log_level"`
	APIURL      string `json:"api_url"`
	DBUsername  string `json:"db_username"`
	DBPassword  string `json:"-"`
	PasswordSet bool   `json:"db_password_set"`
}

func loadConfig() config {
	c := config{
		AppEnv:     getenv("APP_ENV", "local"),
		LogLevel:   getenv("LOG_LEVEL", "info"),
		APIURL:     getenv("API_URL", ""),
		DBUsername: getenv("DB_USERNAME", ""),
		DBPassword: getenv("DB_PASSWORD", ""),
	}
	c.PasswordSet = c.DBPassword != ""
	return c
}

func getenv(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok {
		return v
	}
	return fallback
}

func newMux(c config) *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(c)
	})
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})
	return mux
}

func main() {
	addr := ":" + getenv("PORT", "8080")
	log.Printf("listening on %s", addr)
	log.Fatal(http.ListenAndServe(addr, newMux(loadConfig())))
}
