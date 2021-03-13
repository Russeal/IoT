export class GeneralURL {
    private static RESOURCE_URL = 'https://192.168.1.191:8080/';
    private static MANUAL_URL = 'https://192.168.1.191:8084/';
    private static AUTOMATIC_URL = 'https://192.168.1.191:8082/';
    private static MODE_URL = 'https://192.168.1.191:8083/';


    public static resourceURL: string = GeneralURL.RESOURCE_URL + 'broker/';
    public static topicsURL: string = GeneralURL.RESOURCE_URL + 'topics/';
    public static urlsURL: string = GeneralURL.RESOURCE_URL + 'urls/';



    public static manualURL: string = GeneralURL.MANUAL_URL + 'system/start/';
    public static modeURL: string = GeneralURL.MODE_URL + 'system/start/';

}