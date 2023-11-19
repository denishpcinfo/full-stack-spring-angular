package com.back.d3n15tecback.service;

import com.back.d3n15tecback.model.User;

import java.util.Optional;

public interface IUserService
{
    User saveUser(User user);

    Optional<User> findByUsername(String username);

    void makeAdmin(String username);
}