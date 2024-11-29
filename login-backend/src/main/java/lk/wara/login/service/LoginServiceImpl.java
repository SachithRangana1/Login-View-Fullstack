package lk.wara.login.service;

import lk.wara.login.dto.LoginDto;
import lk.wara.login.entity.Login;
import lk.wara.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService{

    private final LoginRepository loginRepository;

    private Login SaveLogin(Login login, LoginDto loginDto){
        login.setEmail(loginDto.getEmail());
        login.setName(loginDto.getName());
        login.setPassword(loginDto.getPassword());

        return loginRepository.save(login);
    }

    @Override
    public Login PostLogin(LoginDto loginDto) {
        return SaveLogin(new Login(), loginDto);
    }
}
