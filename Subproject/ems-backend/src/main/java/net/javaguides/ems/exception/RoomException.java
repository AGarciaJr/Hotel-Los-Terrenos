package net.javaguides.ems.exception;

public class RoomException extends RuntimeException {
  public RoomException(String message) {
    super(message);
  }

  public static class RoomNotFoundException extends RoomException {
    public RoomNotFoundException(String message) {
      super(message);
    }
  }

  public static class InvalidRoomDataException extends RoomException {
    public InvalidRoomDataException(String message) {
      super(message);
    }
  }

  public static class RoomAlreadyBookedException extends RoomException {
    public RoomAlreadyBookedException(String message) {
      super(message);
    }
  }

  public static class UserNotFoundException extends RoomException {
    public UserNotFoundException(String message) {
      super(message);
    }
  }
}