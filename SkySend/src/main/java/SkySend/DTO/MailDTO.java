package SkySend.DTO;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class MailDTO {

    private Long id;

    private String subject;
    private String body;
    private String toEmail;
}
