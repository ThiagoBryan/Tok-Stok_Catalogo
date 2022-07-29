package tokstok.catalogo.produtos.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {
	
	@ExceptionHandler(value 
		      = {ProdutoException.class })
	protected ResponseEntity<Object> naoEncontrado(ProdutoException ex) {		
		APIError apiError = new APIError(HttpStatus.BAD_REQUEST);
	       apiError.setMessage(ex.getMessage());
	       apiError.setDebugMessage(ex.getLocalizedMessage());
//	       LOGGER.error(ex.getMessage(), ex);
	       return buildResponseEntity(apiError);
	   }
	
	
	@ExceptionHandler(value 
		      = {VideoException.class })
	protected ResponseEntity<Object> naoEncontrado(VideoException ex) {		
		APIError apiError = new APIError(HttpStatus.BAD_REQUEST);
	       apiError.setMessage(ex.getMessage());
	       apiError.setDebugMessage(ex.getLocalizedMessage());
//	       LOGGER.error(ex.getMessage(), ex);
	       return buildResponseEntity(apiError);
	   }
	
	private ResponseEntity<Object> buildResponseEntity(APIError apiError) {
	       return new ResponseEntity<>(apiError, apiError.getStatus());
	   }

}
