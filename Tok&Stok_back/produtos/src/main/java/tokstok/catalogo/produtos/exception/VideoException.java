package tokstok.catalogo.produtos.exception;

public class VideoException extends Exception {

private static final long serialVersionUID = 1L;
	
	public VideoException() {
		super();
	}
	
	public VideoException(String message) {
		super(message);
	}
	

	public VideoException(String message, Exception cause) {
		super(message, cause);
	}
	
	public VideoException(Exception e) {
		super(e);
	}
	

}
