import classes from './Slider.module.scss';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Slider = () => {
    return (
        <div className={ classes["Slider"] }>
            <Carousel
                autoPlay={true}
                showThumbs={false}
                infiniteLoop={true}
                emulateTouch={true}
                stopOnHover={false}
                showStatus={false}
            >
                <div>
                    <img src="https://s3.amazonaws.com/cdn.wp.m4ecmx/wp-content/uploads/2015/05/31143018/Qu%C3%A9-es-el-eCommerce-compressor.jpg" />                    
                </div>
                <div>
                    <img src="https://d1ih8jugeo2m5m.cloudfront.net/2022/07/el-ecommerce-que-es.jpg" />                    
                </div>
                <div>
                    <img src="https://www.similarweb.com/corp/wp-content/uploads/2021/06/2021-Industry-Benchmarks-to-Inform-and-Boost-Your-eCommerce-Strategy-01-01-1.png" />                    
                </div>
                <div>
                    <img src="https://ecommerceresult.com/wp-content/uploads/2019/12/Ecommerce-trends-van-2020.jpeg" />                    
                </div>
            </Carousel>
        </div>
    );
}

export default Slider;