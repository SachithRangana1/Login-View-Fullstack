package lk.wara.login.service;

import lk.wara.login.dto.LoginDto;
import lk.wara.login.entity.Login;


public interface LoginService {

    Login PostLogin (LoginDto loginDto);

}
