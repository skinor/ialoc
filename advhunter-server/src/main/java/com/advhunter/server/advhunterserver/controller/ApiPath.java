package com.advhunter.server.advhunterserver.controller;

public class ApiPath {

    public static final String V1 = "/v1";

    public static final String AUTH_CONTROLLER = "/auth";
    public static final String AUTH_VALID_TOKEN = "/validate";
    public static final String CONNECT_API = "/connect";
    public static final String LOGOUT_API = "/logout";
    public static final String REGISTER_API = "/register";


    public static final String[] permittedApis() {
        return new String[]{
                AUTH_CONTROLLER + CONNECT_API,
                AUTH_CONTROLLER + REGISTER_API
        };
    }

    public static final String[] authenticatedApis() {
        return new String[]{
                AUTH_CONTROLLER + AUTH_VALID_TOKEN,
                AUTH_CONTROLLER + LOGOUT_API,
                "/api"
        };
    }


}
