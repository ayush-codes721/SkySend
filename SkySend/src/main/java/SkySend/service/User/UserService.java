package SkySend.service.User;

import SkySend.DTO.MailDTO;
import SkySend.DTO.UserDTO;
import SkySend.Response.ApiResponse;
import SkySend.Response.ProfileResponse;
import SkySend.exceptions.ResourceNotFoundException;

import SkySend.model.Mail;
import SkySend.model.User;
import SkySend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService, IUserService {
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("user not found"));
    }

    public User getUserById(Long id) {

        return userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
    }


    @Override
    public ApiResponse getAllMailSentByLoggedInUser() {


        User user = userRepo.findById(getUser().getId()).orElseThrow(() -> new ResourceNotFoundException("user not found"));

        UserDTO userDTO = mapToDto(user);
        return ApiResponse
                .builder()
                .message("user mail data")
                .success(true)
                .data(userDTO)
                .build();


    }

    @Override
    public ApiResponse myProFile() {

        User user = getUser();


      ProfileResponse profileResponse=  modelMapper.map(user, ProfileResponse.class);

        return ApiResponse
                .builder()
                .message("user profile")
                .success(true)
                .data(profileResponse)
                .build();
    }

    private UserDTO mapToDto(User user) {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setUsername(user.getUsername());

        List<MailDTO> mailDTOS = userDTO.getMails();

        for (Mail mail : user.getMails()) {
            MailDTO mailDTO = new MailDTO();
            mailDTO.setId(mail.getId());
            mailDTO.setSubject(mail.getSubject());
            mailDTO.setToEmail(mail.getToEmail());
            mailDTO.setBody(mail.getBody());
            mailDTOS.add(mailDTO);
        }

        return userDTO;
    }

    private User getUser() {

        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
