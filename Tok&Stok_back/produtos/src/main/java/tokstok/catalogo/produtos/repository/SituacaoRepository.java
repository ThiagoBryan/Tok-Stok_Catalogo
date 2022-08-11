package tokstok.catalogo.produtos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tokstok.catalogo.produtos.model.Situacao;

@Repository
public interface SituacaoRepository extends JpaRepository<Situacao, Long>  {
    
}
