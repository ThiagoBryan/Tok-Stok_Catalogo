package tokstok.catalogo.produtos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tokstok.catalogo.produtos.model.Video;


@Repository
public interface VideoRepository extends JpaRepository<Video,Long> {

}
