import './LandingPage.css'
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import splitwiseFooter from '../../images/splitwise-footer-img.png'
import nineYards from '../../images/nine-yards.png'
import planeIcon from './images/plane.png'
import houseMates from './images/housemates.png'
import partner from './images/partner.png'
import wild from './images/wild.png'
import apple from './images/apple.png'
import android from './images/android.png'
import lpPlane from './images/lp-plane.png'
import lpHouse from './images/lp-house.png'
import lpHeart from './images/lp-heart.png'
import lpWild from './images/lp-wild.png'
// import { applyMiddleware } from 'redux';

function LandingPage(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };
  
    const loggedSession = useSelector((state) => (state.session.user));

    return(
        <>
        <body className='body'>
            <div className='header'>
                <div className='logo'>
                    <Link className='home-link' to='/'>
                    <img className='landing-logo' src='https://plates.splitwise.com/images/splitwise-logo-bordered.png'/>
                    </Link>
                    <h3 className='landing-logo-text'>Splitwise</h3>
                </div>

                <nav className='landing-nav'>
                    <ul className='landing-nav-list'>
                        <li>
                            <NavLink to='/login' exact={true} className='active login'>
                                Log in
                            </NavLink>
                        </li>

                        <li>
                            <button className='active signup'> 
                            <a href='/sign-up' exact={true} className='active signup'>
                                Sign up
                                </a>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <main className='main'>
            <div className='toggle'>
                <h1>
                     <div className={toggleState === 1 ? "landing-content active-landing-content" : "landing-content"}>
                        Less stress when sharing expenses 
                        <span className='trip-text'>
                            on trips.
                        </span>
                    </div>

                     <div className={toggleState === 2 ? "landing-content active-landing-content" : "landing-content"}>
                        Less stress when sharing expenses 
                        <span className='housemates-text'>
                            with housemates.
                        </span>
                    </div>

                    <div className={toggleState === 3 ? "landing-content active-landing-content" : "landing-content"}>
                        Less stress when sharing expenses 
                        <span className='partner-text'>
                            with your partner.
                        </span>
                    </div>

                    <div className={toggleState === 4 ? "landing-content active-landing-content" : "landing-content"}>
                        Less stress when sharing expenses 
                        <span className='anyone-text'>
                            with anyone.
                        </span>
                    </div>
                </h1>
                  
                <div className='landing-share-list-icons'>
                    <button className={toggleState === 1 ? "landing-tab active-landing-tabs" : "landing-tab "}
                    onClick={() => toggleTab(1)}>
                        <img className='landing-plane-icon' src={planeIcon} alt='plane'/> 
                    </button>

                     <button className={toggleState === 1 ? "landing-tab active-landing-tabs" : "landing-tab "}
                    onClick={() => toggleTab(2)}>
                        <img className='landing-home-icon' src={houseMates} alt='home'/>
                    </button>

                    <button className={toggleState === 1 ? "landing-tab active-landing-tabs" : "landing-tab "}
                    onClick={() => toggleTab(3)}>
                        <img className='landing-heart-icon' src={partner} alt='partner'/>
                    </button>

                    <button className={toggleState === 1 ? "landing-tab active-landing-tabs" : "landing-tab "}
                    onClick={() => toggleTab(4)}>
                        <img className='landing-wild-icon' src={wild} alt='wild'/>
                    </button>
                </div>
                
                <div className='landing-content-tabs'>
                    
                    <div className={toggleState === 1 ? "landing-content active-landing-content" : "landing-content"}>
                        <img src={lpPlane} />
                    </div>

                    <div className={toggleState === 2 ? "landing-content active-landing-content" : "landing-content"}>
                        <img src={lpHouse} />
                    </div>

                    <div className={toggleState === 3 ? "landing-content active-landing-content" : "landing-content"}>
                        <img src={lpHeart} />
                    </div>

                    <div className={toggleState === 4 ? "landing-content active-landing-content" : "landing-content"}>
                        <img src={lpWild} />
                    </div>
                </div>
                
                {/* <ul className='lp-large-icons'>
                    <li className='lp-icon plane hidden'>
                        <img src={lpPlane} />
                    </li>
                    <li className='lp-icon house hidden'>
                        <img src={lpHouse} />
                    </li>
                    <li className='lp-icon heart hidden'>
                        <img src={lpHeart} />
                    </li>
                    <li className='lp-icon wild hidden'>
                        <img src={lpWild} />
                    </li>
                </ul> */}

                        <div className={toggleState === 1 ? "landing-content active-landing-content" : "landing-content"}>
                            <button className='active signup-green'> 
                            <a href='/sign-up' exact={true} className='active signup-green'>
                                Sign up
                            </a>
                            </button>
                        </div>
                        <div className={toggleState === 2 ? "landing-content active-landing-content" : "landing-content"}>
                            <button className='active signup-purple'> 
                            <a href='/sign-up' exact={true} className='active signup-purple'>
                                Sign up
                            </a>
                            </button>
                        </div>
                        <div className={toggleState === 3 ? "landing-content active-landing-content" : "landing-content"}>
                            <button className='active signup-red'> 
                            <a href='/sign-up' exact={true} className='active signup-red'>
                                Sign up
                            </a>
                            </button>
                        </div>
                        <div className={toggleState === 4 ? "landing-content active-landing-content" : "landing-content"}>
                            <button className='active signup-gray'> 
                            <a href='/sign-up' exact={true} className='active signup-gray'>
                                Sign up
                            </a>
                            </button>
                        </div>
                </div>


                    <p className='landing-page-keep-track'>
                        Keep track of your shared expenses and balances with housemates, trips, groups, friends and family.
                    </p>
                    <p className='landing-page-free'>
                        Free for <img className='apple' src={apple}/> iPhone, <img className='android' src={android} /> Android, and web.
                    </p>

                <div className='balance-div'>
                <div className='track-balances'>
                    <h2 className='balance-text-title'> Track balances </h2>
                    <p className='balance-text-description'> Keep track of shared expenses, balances and who owes who. </p>
                    <img className='balance-img' src='https://secure.splitwise.com/assets/home_page/fixtures/asset1.png'/>
                </div>
                </div>
                
                <div className='organize-expenses-div'>
                <div className='organize-expenses'>
                    <h2 className='organize-expenses-title'>
                        Organize expenses
                    </h2>
                    <p className='organize-expenses-description'>
                        Split expenses with any group: trips, housemates, friends, and family. 
                    </p>
                    <img className='organize-image' src='https://secure.splitwise.com/assets/home_page/fixtures/asset2.png' />
                </div>
                </div>

                <div className='add-expenses-div'>
                <div className='add-expenses'>
                    <h2 className='add-expenses-title'>
                        Add expenses easily
                    </h2>
                    <p className='add-expenses-description'>
                        Quickly add expenses on the go before you forget who paid.
                    </p>
                    <img className='add-expenses-image' src='https://secure.splitwise.com/assets/home_page/fixtures/asset3.png' />
                </div>
                </div>

                <div className='pay-expenses-div'>
                <div className='pay-expenses'>
                    <h2 className='pay-expenses-title'>
                        Pay friends back
                    </h2>
                    <p className='pay-expenses-description'>
                        Settle up with a friend and record any cash or online payment.
                    </p>
                    <img className='pay-image' src='https://secure.splitwise.com/assets/home_page/fixtures/asset4.png' />
                </div>
                </div>

                <div className='pro-expenses-div'>
                <div className='pro-expenses'>
                    <h2 className='pro-expenses-title'>
                        Get even more with PRO
                    </h2>
                    <p className='pro-expenses-description'>
                        Get even more organized with receipt scanning, charts and graphs, currency conversion, and more!
                    </p>
                    <img className='pro-image' src='https://secure.splitwise.com/assets/home_page/fixtures/asset5.png' />
                </div>
                </div>

                <div>
                    <img className='nine-yards-img' src={nineYards} alt='image' />
                </div>


                <div className='review-grid'>
                    <div className='review-div'>
                    <div className='review'>
                            "Fundametal" for tracking finances. As good as WhatsApp for containing awkwardness.
                        </div>
                        <div className='review-source-div'>
                            <img className='review-source-img' src='https://secure.splitwise.com/assets/home_page/logos/ft.png'/>
                            <p className='review-source'>
                                Financial Times
                            </p>
                        </div>
                    </div>

                    <div className='review-div'>
                    <div className='review'>
                            Makes it easy to split everything from your dinner bill to rent.
                        </div>
                        <div className='review-source-div'>
                            <img className='review-source-img' src='https://secure.splitwise.com/assets/home_page/logos/nyt.png'/>
                            <p className='review-source'>
                                NY Times
                            </p>
                        </div>
                    </div>

                    <div className='review-div'>
                        <div className='review'>
                            I never fight with rommates over bills because of this genius expense-splitting app
                        </div>
                        <div className='review-source-div'>
                            <img className='review-source-img' src='https://secure.splitwise.com/assets/home_page/logos/bi.png'/>
                            <p className='review-source'>
                                Business Insider
                            </p>
                        </div>
                    </div>

                    <div className='review-div'>
                    <div className='review'>
                            Life hack for group trips. Amazing tool to use when traveling with friends! Makes life so easy!!
                        </div>
                        <div className='review-source-div'>
                    
                            <p className='review-source'>
                                Ahah S, iOS
                            </p>
                        </div>
                    </div>

                    <div className='review-div'>
                    <div className='review'>
                            So amazing to have this app manage balances and help keep money out of relationships. love it!
                        </div>
                        <div className='review-source-div'>
                            
                            <p className='review-source'>
                               Haseena C, Android
                            </p>
                        </div>
                    </div>

                    <div className='review-div'>
                    <div className='review'>
                            I use it everyday. I use it for trips, roommates, loans. I love splitwise.
                        </div>
                        <div className='review-source-div'>
                            
                            <p className='review-source'>
                                Trickseyus, iOS
                            </p>
                        </div>
                    </div>
                </div>


            </main>
            <footer>
                <div className='footer-div'>
                    <ul className='footer-section'>
                        <li className='footer-splitwise title'>Splitwise</li>
                        <li>About</li>
                    </ul>
                    <div className='footer-section'>
                        <li className='footer-account title'>Account</li>
                        <a className='footer-login' href='/login'>Log in</a>
                        <a className='footer-signup' href='/sign-up'>Sign up</a>
                        <li>Reset password</li>
                    </div>
                    <ul className='footer-section'>
                        <li className='footer-more title'>More</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div className='download-button-div'>

                    <div className='download-button'>
                        <a href='https://play.google.com/store/apps/details?id=com.Splitwise.SplitwiseMobile' target="_blank">
                            <img className='appStore-img' src='https://a-v2.sndcdn.com/assets/images/google_play_badge@en_2x-ad41a4d7.png' to='https://play.google.com/store/apps/details?id=com.Splitwise.SplitwiseMobile'/>
                        </a>
                    </div>

                    <div className='download-button'>
                        <a href='https://apps.apple.com/us/app/splitwise/id458023433' target="_blank">
                            <img className='appStore-img' src='https://a-v2.sndcdn.com/assets/images/appstore_badge@en_2x-5a6e21e0.png' 
                            to='https://apps.apple.com/us/app/splitwise/id458023433'
                            />
                        </a>
                    </div>
                </div>
                <img className='footer-image' src={splitwiseFooter} alt='footer-image'/>
                
            </footer>
        </body>
        </>
    )
}

export default LandingPage

