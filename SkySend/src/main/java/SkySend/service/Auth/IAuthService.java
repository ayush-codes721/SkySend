package SkySend.service.Auth;

import SkySend.Request.LoginRequest;
import SkySend.Request.SignupRequest;
import SkySend.Response.ApiResponse;

public interface IAuthService {

    ApiResponse signup(SignupRequest signupRequest);

    ApiResponse login(LoginRequest loginRequest);


}
