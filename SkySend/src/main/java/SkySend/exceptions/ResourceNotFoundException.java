package SkySend.exceptions;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String userNotFound) {
        super(userNotFound);
    }
}
