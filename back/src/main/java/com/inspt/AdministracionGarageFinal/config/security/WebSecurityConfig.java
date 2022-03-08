/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.inspt.AdministracionGarageFinal.config.security;

import com.inspt.AdministracionGarageFinal.util.ERole;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 *
 * @author garay
 */
@Configuration
@AllArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{


    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserDetailsService userDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

	http.csrf().disable();
        http.cors();
    	http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
            .antMatchers("/auth/sign-up/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers("/auth/sign-in/**","/auth/me").permitAll()
            .antMatchers(HttpMethod.POST,"/user/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.PUT,"/user/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.DELETE,"/user/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.GET,"/user/**").permitAll()
            .antMatchers(HttpMethod.POST,"/vehicle/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.PUT,"/vehicle/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.DELETE,"/vehicle/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.GET,"/vehicle/**").permitAll()            
            .antMatchers(HttpMethod.POST,"/garages/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.PUT,"/garages/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.DELETE,"/garages/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.GET,"/garages/**").permitAll()
            .antMatchers(HttpMethod.POST,"/zones/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.PUT,"/zones/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.DELETE,"/zones/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.GET,"/zones/**").permitAll()
            .antMatchers(HttpMethod.POST,"/employee/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.PUT,"/employee/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.DELETE,"/employee/**").hasAnyAuthority(ERole.ROLE_ADMIN.name())
            .antMatchers(HttpMethod.GET,"/employee/**").permitAll()
            .antMatchers("/api/docs/**", "/api/swagger-ui/**", "/v3/api-docs/**").permitAll()
            .anyRequest().authenticated();
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); //Add filters for JWT
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }    
}
