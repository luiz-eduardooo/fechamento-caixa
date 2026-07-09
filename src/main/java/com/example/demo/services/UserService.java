package com.example.demo.services;


import com.example.demo.dtos.UserRequestCadastroDTO;
import com.example.demo.dtos.UserResponseDTO;
import com.example.demo.entities.Usuario;
import com.example.demo.exceptions.EmailJaCadastradoException;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponseDTO cadastroUsuario(UserRequestCadastroDTO dto){
        verificarEmailUsuario(dto.email());
        Usuario usuario = new Usuario();
        usuario.setEmail(dto.email());
        usuario.setNome(dto.nome());
        usuario.setPassword(passwordEncoder.encode(dto.password()));
        Usuario usuarioSalvo = repository.save(usuario);
        return toResponseDTO(usuarioSalvo);
    }



    private void verificarEmailUsuario(String email){
        if(repository.existsByEmail(email)){
            throw new EmailJaCadastradoException("Email ja existente!");
        }
    }

    private Usuario procurarUsuario(String email){
        return (Usuario) repository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("Usuário não existente!"));
    }

    private UserResponseDTO toResponseDTO(Usuario usuario){
        return new UserResponseDTO(usuario.getId(), usuario.getRole(), usuario.getEmail(), usuario.getNome());
    }
}
