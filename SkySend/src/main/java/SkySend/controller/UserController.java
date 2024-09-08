package SkySend.controller;

import SkySend.Response.ApiResponse;
import SkySend.service.User.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final IUserService userService;


    @GetMapping("/mails")
    public ResponseEntity<ApiResponse> getAllMailSentByLoggedInUser() {
        ApiResponse response = userService.getAllMailSentByLoggedInUser();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> myProfile() {
        ApiResponse response = userService.myProFile();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
