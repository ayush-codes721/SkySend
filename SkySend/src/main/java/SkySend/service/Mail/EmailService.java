package SkySend.service.Mail;

import SkySend.Response.ApiResponse;
import SkySend.config.MailConfig;
import SkySend.model.Mail;
import SkySend.model.User;
import SkySend.repo.MailRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

    private final JavaMailSender javaMailSender;

    private final MailConfig mailConfig;
    private final MailRepo mailrepo;

    @Transactional
    @Override
    public ApiResponse sendMessage(String to, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(mailConfig.getFromEmail());
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        javaMailSender.send(mailMessage);
        createMail(to, subject, message);


        ApiResponse apiResponse = ApiResponse.builder().
                message("mail sent successfully")
                .success(true)
                .data("mail sent")
                .build();

        return apiResponse;
    }

    @Transactional
    @Override
    public ApiResponse sendAttachment(String to, String subject, String message, MultipartFile file) {

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setFrom(mailConfig.getFromEmail());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(message);
            if (file != null && !file.isEmpty()) {
                helper.addAttachment(file.getOriginalFilename(), file);
            }
            javaMailSender.send(mimeMessage);
            createMail(to, subject, message);
            return ApiResponse
                    .builder()
                    .message("Mail sent successFully")
                    .success(true)
                    .data("Mail sent ")
                    .build();
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }


    }

    private void createMail(String to, String subject, String message) {
        User user = getUser();

        Mail mail = new Mail();
        mail.setToEmail(to);
        mail.setSubject(subject);
        mail.setUser(user);
        mail.setBody(message);

        mailrepo.save(mail);
    }

    private User getUser() {

        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
