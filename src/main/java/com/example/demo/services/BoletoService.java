package com.example.demo.services;


import com.example.demo.dtos.boleto.BoletoRequestDTO;
import com.example.demo.dtos.boleto.BoletoResponseDTO;
import com.example.demo.entities.Boleto;
import com.example.demo.enums.StatusBoleto;
import com.example.demo.exceptions.boleto.BoletoJaPagoException;
import com.example.demo.exceptions.boleto.BoletoNaoEncontradoException;
import com.example.demo.exceptions.boleto.BoletoPagoNaoPodeSerDeletadoException;
import com.example.demo.exceptions.boleto.StatusInvalidoException;
import com.example.demo.repositories.BoletoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoletoService {

    private final BoletoRepository repository;

    @Transactional
    public BoletoResponseDTO criarBoleto(BoletoRequestDTO dto){
        Boleto boleto = new Boleto();
        boleto.setValor(dto.valor());
        boleto.setCodigoDeBarras(dto.codigoDeBarras());
        boleto.setNomeFornecedor(dto.nomeFornecedor());
        boleto.setDataChegada(dto.dataChegada());
        boleto.setDataVencimento(dto.dataVencimento());
        Boleto boletoSalvo = repository.save(boleto);
        return toResponseDTO(boletoSalvo);
    }

    @Transactional
    public BoletoResponseDTO pagarBoleto(Long id,StatusBoleto statusBoleto){
        if(statusBoleto == StatusBoleto.PENDENTE){
            throw new StatusInvalidoException("Não há como mudar o pagamento para pendente!");
        }
        Boleto boleto = procurarBoleto(id);
        validarBoleto(boleto);
        boleto.setStatusBoleto(statusBoleto);
        boleto.setDataPagamento(LocalDate.now());
        Boleto boletoSalvo = repository.save(boleto);
        return toResponseDTO(boletoSalvo);
    }

    @Transactional(readOnly = true)
    public BoletoResponseDTO verBoleto(Long id){
        return toResponseDTO(procurarBoleto(id));
    }

    @Transactional(readOnly = true)
    public List<BoletoResponseDTO> listarBoletos(){
        return repository.findAll().stream().map(this::toResponseDTO).toList();
    }

    @Transactional(readOnly = true)
    public List<BoletoResponseDTO> listarBoletosPorFornecedor(String fornecedor){
        return repository.findAllByNomeFornecedor(fornecedor).stream().map(this::toResponseDTO).toList();
    }


    @Transactional
    public void deletarBoleto(Long id){
        Boleto boleto = procurarBoleto(id);
        validarDelecaoBoleto(boleto);
        repository.delete(boleto);
    }


    // helpers //


    private BoletoResponseDTO toResponseDTO(Boleto boleto){
        return new BoletoResponseDTO(boleto.getId(), boleto.getNomeFornecedor(), boleto.getValor(), boleto.getCodigoDeBarras(), boleto.getDataVencimento(), boleto.getDataChegada(), boleto.getDataPagamento(), boleto.getStatusBoleto());
    }

    private Boleto procurarBoleto(Long id){
        return repository.findById(id).orElseThrow(()-> new BoletoNaoEncontradoException("Esse boleto não foi encontrado na base de dados!"));
    }

    private void validarBoleto(Boleto boleto){
        if(boleto.getStatusBoleto() != StatusBoleto.PENDENTE){
            throw new BoletoJaPagoException("Esse boleto ja está pago!");
        }
    }

    private void validarDelecaoBoleto(Boleto boleto){
        if(boleto.getStatusBoleto() != StatusBoleto.PENDENTE){
            throw new BoletoPagoNaoPodeSerDeletadoException("Esse boleto não pode ser deletado pois ja foi pago.");
        }
    }
}
