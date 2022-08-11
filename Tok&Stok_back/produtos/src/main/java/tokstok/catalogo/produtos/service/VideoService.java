package tokstok.catalogo.produtos.service;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import tokstok.catalogo.produtos.exception.VideoException;
import tokstok.catalogo.produtos.model.Video;
import tokstok.catalogo.produtos.repository.ProdutoRepository;
import tokstok.catalogo.produtos.repository.VideoRepository;

@Service
public class VideoService {

	@Autowired
	private VideoRepository videoRepository;

	@Autowired
	private ProdutoRepository produtoRepository;


	public Long salvar(MultipartFile file, Long idProduto) throws IOException {

		Video videoSalvar = new Video();
		videoSalvar.setDados(file.getBytes());
		videoSalvar.setNome(file.getOriginalFilename());
		videoSalvar.setTipo(file.getContentType());
		videoSalvar.setProduto(produtoRepository.findById(idProduto).get());
		videoRepository.saveAndFlush(videoSalvar);
		videoSalvar.setUrl(adicionarVideoUri(videoSalvar));
		videoRepository.save(videoSalvar);

		return videoSalvar.getId();
	}

	public String atualizarNome(Long id, String nome) throws VideoException{
		Video videoEncontrado = videoRepository.findById(id).get();

		if(videoEncontrado != null){
			videoEncontrado.setId(id);
			videoEncontrado.setNome(nome);
			videoRepository.save(videoEncontrado);

			return "Atualizado com sucesso";
		}
		throw new VideoException("O video não existe");
	}
	
	public String atualizarDescricao(Long id, String descricao) throws VideoException{
		Video videoEncontrado = videoRepository.findById(id).get();

		if(videoEncontrado != null){
			videoEncontrado.setId(id);
			videoEncontrado.setDescricao(descricao);
			videoRepository.save(videoEncontrado);

			return "Atualizado com sucesso";
		}
		throw new VideoException("A descrição não existe");
	}

	public Integer atualizarPosicao(Long id, Integer posicao) throws VideoException{
		Video videoEncontrado = videoRepository.findById(id).get();

		if(videoEncontrado != null){
			videoEncontrado.setId(id);
			if(posicao > 3){
				throw new VideoException("Posição do vídeo INVÁLIDA");
			}
			videoEncontrado.setPosicao(posicao);
			videoRepository.save(videoEncontrado);

			return posicao;
		}else{
			throw new VideoException("O vídeo não existe");
		}
	}


	public String adicionarVideoUri(Video video){
		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/videos/buscar/{id}")
		.buildAndExpand(video.getId()).toUri();

		return uri.toString();
	}

	public Video buscarPorId(Long id) throws VideoException {
		Optional<Video> video = videoRepository.findById(id);
		if (video.isPresent()) {
			return video.get();
		}
		throw new VideoException("Video com o id informado nao encontrado");
	}

	public void deletar(Long id) throws VideoException{
		Optional<Video> video = videoRepository.findById(id);
		if (video.isPresent()) {
			videoRepository.deleteById(id);
		}
		throw new VideoException("Video com o id informado nao encontrado");
	}


}
