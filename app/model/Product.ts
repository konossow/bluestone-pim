export interface Product {
    name: string;
    number: string;
    description: string;
    images: ImgData[];
}

interface ImgData {
    url: string;
    name: string;
}