package com.paypal.integration.common;

import java.net.InetAddress;
import java.util.UUID;

/**
 * id generation common class
 */
public class IdUtils {

    private IdUtils() {
    }

    private static final int IP;

    private static short counter = (short) 0;

    private static final int JVM = (int) (System.currentTimeMillis() >>> 8);

    static {
        int ipadd;
        try {
            ipadd = toInt(InetAddress.getLocalHost().getAddress());
        } catch (Exception e) {
            ipadd = 0;
        }
        IP = ipadd;
    }

    /**
     * uuid
     *
     * @return
     */
    public static String uuid() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * 16 digits uuid
     *
     * @return
     */
    public static String uuid16() {
        String uuid = UUID.randomUUID().toString();
        uuid = uuid.replace("-", "").substring(0, 16);
        return uuid;
    }


    /**
     * 32 digits UUID
     *
     * @return
     */

    public static String id32() {
        return new StringBuilder(32)
                .append(format(getIP()))
                .append(format(getJVM()))
                .append(format(getHiTime()))
                .append(format(getLoTime()))
                .append(format(getCount()))
                .toString();

    }

    private final static String format(int intval) {
        String formatted = Integer.toHexString(intval);
        StringBuilder buf = new StringBuilder("00000000");
        buf.replace(8 - formatted.length(), 8, formatted);
        return buf.toString();
    }

    private final static String format(short shortval) {
        String formatted = Integer.toHexString(shortval);
        StringBuilder buf = new StringBuilder("0000");
        buf.replace(4 - formatted.length(), 4, formatted);
        return buf.toString();
    }

    private final static int getJVM() {
        return JVM;
    }

    private final static short getCount() {
        synchronized (IdUtils.class) {
            if (counter < 0) {
                counter = 0;
            }
            return counter++;
        }
    }

    /**
     * Unique in a local network
     */
    private final static int getIP() {
        return IP;
    }

    /**
     * Unique down to millisecond
     */
    private final static short getHiTime() {
        return (short) (System.currentTimeMillis() >>> 32);
    }

    private final static int getLoTime() {
        return (int) System.currentTimeMillis();
    }

    private final static int toInt(byte[] bytes) {
        return bytes[3] & 0xFF |
                (bytes[2] & 0xFF) << 8 |
                (bytes[1] & 0xFF) << 16 |
                (bytes[0] & 0xFF) << 24;
    }
}
