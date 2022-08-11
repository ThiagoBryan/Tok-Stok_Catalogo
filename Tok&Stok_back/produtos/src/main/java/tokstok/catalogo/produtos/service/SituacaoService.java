package tokstok.catalogo.produtos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tokstok.catalogo.produtos.model.Situacao;
import tokstok.catalogo.produtos.repository.SituacaoRepository;

@Service
public class SituacaoService {

    @Autowired
    private SituacaoRepository situacaoRepository;

    public List<Situacao> listar(){
        return situacaoRepository.findAll();
    }

    public Situacao salvarSituacao(Situacao situacao){
        situacao.setNome(situacao.getNome().toUpperCase());
        return situacaoRepository.save(situacao);
    }
}
