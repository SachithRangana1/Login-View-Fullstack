package lk.wara.login.controller;

import lk.wara.login.dto.LoginDto;
import lk.wara.login.entity.Login;
import lk.wara.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> postLogin(@RequestBody LoginDto loginDto){
        Login savedLog = loginService.PostLogin(loginDto);

        if (savedLog != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(savedLog);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
