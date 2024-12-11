package net.javaguides.ems.enums;

public class RoomEnums {
    public enum RoomType {
        NATURE_RETREAT("Nature Retreat"),
        URBAN_ELEGANCE("Urban Elegance"),
        VINTAGE_CHARM("Vintage Charm");

        private final String displayName;

        RoomType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum QualityLevel {
        EXECUTIVE("executive"),
        BUSINESS("business"),
        COMFORT("comfort"),
        ECONOMY("economy");

        private final String level;

        QualityLevel(String level) {
            this.level = level;
        }

        public String getLevel() {
            return level;
        }
    }

    public enum BedType {
        TWIN("twin"),
        FULL("full"),
        QUEEN("queen"),
        KING("king");

        private final String type;

        BedType(String type) {
            this.type = type;
        }

        public String getType() {
            return type;
        }
    }
}