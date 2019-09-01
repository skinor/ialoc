package com.advhunter.server.advhunterserver.controller.authentication;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import com.advhunter.server.advhunterserver.controller.ApiPath;
import com.advhunter.server.advhunterserver.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.advhunter.server.advhunterserver.message.request.LoginForm;
import com.advhunter.server.advhunterserver.message.request.SignUpForm;
import com.advhunter.server.advhunterserver.message.response.JwtResponse;
import com.advhunter.server.advhunterserver.message.response.ResponseMessage;
import com.advhunter.server.advhunterserver.models.Role;
import com.advhunter.server.advhunterserver.models.RoleName;
import com.advhunter.server.advhunterserver.models.User;
import com.advhunter.server.advhunterserver.repository.RoleRepository;
import com.advhunter.server.advhunterserver.repository.UserRepository;
import com.advhunter.server.advhunterserver.security.jwt.JwtProvider;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(ApiPath.AUTH_CONTROLLER)
public class UserAuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;



    @PostMapping(ApiPath.CONNECT_API)
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }

    @GetMapping(ApiPath.LOGOUT_API)
    public HttpStatus logout() {
        SecurityContextHolder.clearContext();
        return HttpStatus.OK;
    }

    @GetMapping(ApiPath.AUTH_VALID_TOKEN)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public HttpStatus validateToken() {
        return HttpStatus.OK;
    }


    @PostMapping(ApiPath.REGISTER_API)
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getEmail(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
        roles.add(userRole);

        /*strRoles.forEach(role -> {
            switch (role) {
                case "admin":
                    Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                    roles.add(adminRole);

                    break;
                case "pm":
                    Role pmRole = roleRepository.findByName(RoleName.ROLE_PM)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                    roles.add(pmRole);

                    break;
                default:
                    Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                    roles.add(userRole);
            }
        });*/

        user.setRoles(roles);
        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }
}
