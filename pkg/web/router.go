package web

import (
	"github.com/aerogear/mobile-security-service/pkg/web/apps"
	"github.com/labstack/echo"

	"strings"

	"github.com/labstack/echo/middleware"
	"gopkg.in/go-playground/validator.v9"
)

type RequestValidator struct {
	validator *validator.Validate
}

func (v *RequestValidator) Validate(i interface{}) error {
	return v.validator.Struct(i)
}

func NewRouter(fileDir string, apiRoutePrefix string) *echo.Echo {
	router := echo.New()

	router.Use(middleware.Logger())
	router.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:  fileDir,
		HTML5: true,
		Index: "index.html",
		Skipper: func(context echo.Context) bool {
			// We don't want to return the SPA if any api/* is called, it should act like a normal API.
			return strings.HasPrefix(context.Request().URL.Path, apiRoutePrefix)
		},
		Browse: false,
	}))
	router.Validator = &RequestValidator{validator: validator.New()}
	return router
}

func SetupAppsRoute(r *echo.Group, appsHandler *apps.HTTPHandler) {
	r.GET("/apps", appsHandler.GetApps)
}