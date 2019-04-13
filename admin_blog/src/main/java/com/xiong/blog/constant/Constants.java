package com.xiong.blog.constant;

public class Constants {
    public static enum AlbumType{

        ORDINARY(1,"普通相册"),
        PARENTING(2,"亲子相册"),
        TOURISM(3,"旅游相册"),
        LOVERS(4,"情侣相册");

        private AlbumType(Integer value,String name){
            this.value = value;
            this.name = name;
        }
        private final Integer value;
        private final String name;

        public Integer getValue() {
            return value;
        }

        public String getName() {
            return name;
        }

        public static String getDesc(Integer value) {
            AlbumType[] albumTypes = values();
            for (AlbumType albumType : albumTypes) {
                if (albumType.getValue().equals(value)) {
                    return albumType.getName();
                }
            }
            return null;
        }
    }
}
