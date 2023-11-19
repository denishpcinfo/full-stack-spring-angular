package com.back.d3n15tecback.service;

import com.back.d3n15tecback.model.User;

public interface IAuthenticationService
{
    User signInAndReturnJWT(User signInRequest);
}