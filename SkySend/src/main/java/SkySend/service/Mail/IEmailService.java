package SkySend.service.Mail;

import SkySend.Response.ApiResponse;
import org.springframework.web.multipart.MultipartFile;

public interface IEmailService {


        ApiResponse sendMessage(String to,String subject,String message);
        ApiResponse sendAttachment(String to, String subject, String message, MultipartFile file);

}
