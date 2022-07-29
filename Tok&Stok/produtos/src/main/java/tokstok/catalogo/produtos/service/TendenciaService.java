package tokstok.catalogo.produtos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tokstok.catalogo.produtos.model.Tendencia;
import tokstok.catalogo.produtos.repository.TendenciaRepository;



@Service
public class TendenciaService {
	
	@Autowired
	private TendenciaRepository tendenciaRepository;
	
	public Tendencia salvarTendencia(Tendencia tendencia){
		tendencia.setNome(tendencia.getNome().toUpperCase());
        return tendenciaRepository.save(tendencia);
    }

	public List<Tendencia> listar(){
        return tendenciaRepository.findAll();
    }

}
