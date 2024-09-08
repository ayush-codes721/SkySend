package SkySend.service.User;

import SkySend.Response.ApiResponse;

public interface IUserService {
    ApiResponse getAllMailSentByLoggedInUser();
    ApiResponse myProFile();

}
