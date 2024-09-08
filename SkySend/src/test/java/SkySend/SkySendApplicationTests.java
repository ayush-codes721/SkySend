package SkySend;

import SkySend.config.MailConfig;
import SkySend.service.Mail.IEmailService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest
class SkySendApplicationTests {

    @Autowired
    private IEmailService emailService;
    @Autowired
    private MailConfig mailConfig;

    @Test
    void contextLoads() {



    }

}
