package tokstok.catalogo.produtos.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tokstok.catalogo.produtos.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto,Long>{
    
    @Query("SELECT prod FROM Produto prod LEFT JOIN Video vid ON vid.produto = prod.id " +
    "WHERE vid.produto IS NULL AND LOWER(prod.nome) LIKE :nome% " + 
    "AND prod.situacao.nome LIKE concat('%', :situacao,'%') AND prod.tendencia.nome LIKE concat('%', :tendencia,'%')")
    Page<Produto> listaProdutosSemVideo(Pageable pageable, String nome, String situacao, String tendencia);

    @Transactional
    @Query("SELECT DISTINCT prod FROM Produto prod LEFT JOIN Video vid ON vid.produto = prod.id " + 
    " WHERE vid.produto IS NOT NULL AND LOWER(prod.nome) LIKE :nome% " + 
    "AND prod.situacao.nome LIKE concat('%', :situacao,'%') AND prod.tendencia.nome LIKE concat('%', :tendencia,'%')")
    Page<Produto> listaProdutosComVideo(Pageable pageable, String nome, String situacao, String tendencia);

    @Transactional
    @Query("SELECT COUNT(*) FROM Video vid WHERE vid.produto.id = :idProduto")
    Long quantidadeDeVideosEmProdutos(Long idProduto);

    @Transactional
    Page<Produto> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

    @Transactional
    @Query("SELECT DISTINCT prod FROM Produto prod LEFT JOIN Video vid ON vid.produto = prod.id " + 
    " WHERE LOWER(prod.nome) LIKE :nome% " + 
    "AND prod.situacao.nome LIKE concat('%', :situacao,'%') AND prod.tendencia.nome LIKE concat('%', :tendencia,'%')")
    Page<Produto> encontrarPorNome(Pageable pageable, String nome, String situacao, String tendencia);

    @Query("SELECT prod FROM Produto prod LEFT JOIN Video vid ON vid.produto = prod.id " +
    "WHERE vid.produto IS NULL")
    List<Produto> verficaVideoEmProdutos();

    @Transactional
    @Query("SELECT prod FROM Produto prod LEFT JOIN Video vid ON vid.produto = prod.id" + 
    " WHERE prod.situacao.nome = :situacao AND LOWER(prod.nome) LIKE :nome%")
    Page<Produto> encontrarPorSituacao(String situacao, Pageable pageable, String nome);

    @Transactional
    @Query("SELECT prod FROM Produto prod LEFT JOIN Video vid ON vid.produto = prod.id" + 
    " WHERE prod.tendencia.nome = :tendencia AND LOWER(prod.nome) LIKE :nome%")
    Page<Produto> encontrarPorTendencia(String tendencia, Pageable pageable, String nome);

}