package SkySend.controller;

import SkySend.Response.ApiResponse;
import SkySend.service.Mail.IEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class EmailController {

    private final IEmailService emailService;


    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendMessage(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String message) {

        ApiResponse response = emailService.sendMessage(to, subject, message);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/send/attachment")
    public ResponseEntity<ApiResponse> sendAttachment(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String message,
            @RequestParam(required = false) MultipartFile file) {

        ApiResponse response = emailService.sendAttachment(to, subject, message, file);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
