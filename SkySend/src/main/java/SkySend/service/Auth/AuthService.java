package SkySend.service.Auth;

import SkySend.Request.LoginRequest;
import SkySend.Request.SignupRequest;
import SkySend.Response.ApiResponse;
import SkySend.Response.LoginResponse;
import SkySend.Response.SignupResponse;
import SkySend.exceptions.ResourceNotFoundException;
import SkySend.model.User;
import SkySend.repo.UserRepo;
import SkySend.service.JWT.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


    @Transactional
    @Override
    public ApiResponse signup(SignupRequest signupRequest) {

        boolean isPresent = userRepo.findByUsername(signupRequest.getUsername()).isPresent();
        if (isPresent) {
            throw new BadCredentialsException("user already exist");
        }

        User user = new User();
        user.setName(signupRequest.getName());
        user.setUsername(signupRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        User saveduser = userRepo.save(user);

        SignupResponse signupResponse = modelMapper.map(saveduser, SignupResponse.class);


        return ApiResponse
                .builder()
                .success(true)
                .data(signupResponse)
                .message("signup Success!")
                .build();
    }

    @Override
    public ApiResponse login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        User user = (User) authentication.getPrincipal();
        String token = jwtService.createAccessToken(user);
        LoginResponse loginResponse = new LoginResponse(user.getId(), token);

        return ApiResponse.builder()
                .data(loginResponse)
                .message("verification SuccessFull!")
                .success(true)
                .build();
    }


}
