package main

import (
	"github.com/aerogear/mobile-security-service/pkg/config"
	"github.com/aerogear/mobile-security-service/pkg/web"
	"github.com/aerogear/mobile-security-service/pkg/web/apps"
	"github.com/aerogear/mobile-security-service/pkg/web/middleware"
	dotenv "github.com/joho/godotenv"
	"github.com/labstack/echo"
	log "github.com/sirupsen/logrus"
)

func init() {
	config := config.Get()

	initLogger(config.LogLevel, config.LogFormat)

	err := dotenv.Load()

	if err != nil {
		log.Info("No .env file found, using default values instead.")
	}
}

func main() {
	config := config.Get()
	staticFilesDir := config.StaticFilesDir
	apiRoutePrefix := config.ApiRoutePrefix

	//e := echo.New()
	e := web.NewRouter(staticFilesDir, apiRoutePrefix)

	// Load middleware
	middleware.Init(e, config)

	initHandlers(e, config)

	// start webserver
	if err := e.Start(config.ListenAddress); err != nil {
		panic("failed to start" + err.Error())
	}
}

func initLogger(level, format string) {
	logLevel, err := log.ParseLevel(level)

	if err != nil {
		log.Fatalf("log level %v is not allowed. Must be one of [debug, info, warning, error, fatal, panic]", level)
		logLevel = log.InfoLevel
	}

	log.SetLevel(logLevel)

	switch format {
	case "json":
		log.SetFormatter(&log.JSONFormatter{})
	case "text":
		log.SetFormatter(&log.TextFormatter{DisableColors: true})
	default:
		log.Fatalf("log format %v is not allowed. Must be one of [text, json]", format)
	}
}

// Invoke handlers, services and repositories here
func initHandlers(e *echo.Echo, c config.Config) {
	// App handler setup
	appsPostgreSQLRepository := apps.NewPostgreSQLRepository()
	appsService := apps.NewService(appsPostgreSQLRepository)
	appsHandler := apps.NewHTTPHandler(e, appsService)

	// Setup /app routes
	apiRoutePrefix := c.ApiRoutePrefix

	apiGroup := e.Group(apiRoutePrefix)
	web.SetupAppsRoute(apiGroup, appsHandler)
	//e.GET("/apps", appsHandler.GetApps)
}
