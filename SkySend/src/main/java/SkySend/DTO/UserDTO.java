package SkySend.DTO;

import SkySend.model.Mail;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String name;

    private List<MailDTO> mails = new ArrayList<>();


}
