package tokstok.catalogo.produtos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tokstok.catalogo.produtos.model.Tendencia;


@Repository
public interface TendenciaRepository extends JpaRepository<Tendencia,Long> {

}
