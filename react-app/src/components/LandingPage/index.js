import './LandingPage.css'
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function LandingPage(){
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
                {/* <img className='background-img' src='https://assets.splitwise.com/assets/core/facets.png'/> */}

                <h2 className='sharing-expenses'> 
                    Less stress when sharing expenses
                </h2>
                <span className='landing-share-options'>
                    on trips
                </span>

                <ul className='text-swap-list'>
                    <li className='text-swap-option'>
                        <a>
                            <svg className='text-swap-house' >

                            </svg>
                        </a>
                    </li>
                    <li className='text-swap-option'>
                        <a>
                            <svg className='text-swap-heart' >

                            </svg>
                        </a>
                    </li>
                    <li className='text-swap-option'>
                        <a>
                            <svg className='text-swap-wild-card' >

                            </svg>
                        </a>
                    </li>
                    <li className='text-swap-option'>
                        <a>
                            <svg className='text-swap-plane' >

                            </svg>
                        </a>
                    </li>
                   
                </ul>

                <div className='download-app-div'>
                    <button className='landing-app-download'>
                        <a className='download-link' href='/'>
                        Download the app
                        </a>
                    </button>
                </div>


                    <p className='landing-page-keep-track'>
                        Keep track of your shared expenses and balances with housemates, trips, groups, friends and family.
                    </p>
                    <p className='landing-page-free'>
                        Free for iPhone, Android, and web.
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
                    <img className='add-image' src='https://secure.splitwise.com/assets/home_page/fixtures/asset3.png' />
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
                    <img className='nine-yards-img' src='react-app/public/nine-yards.png' alt='image' />
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
                    <ul className='footer-section'>
                        <li className='footer-account title'>Account</li>
                        <li>Log in</li>
                        <li>Sign up</li>
                        <li>Reset password</li>
                    </ul>
                    <ul className='footer-section'>
                        <li className='footer-more title'>More</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div className='download-button-div'>

                    <div className='download-button'>
                        <a href='https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us' target="_blank">
                            <img className='appStore-img' src='https://a-v2.sndcdn.com/assets/images/google_play_badge@en_2x-ad41a4d7.png' to='https://play.google.com/store/apps/details?id=com.soundcloud.android&hl=us'/>
                        </a>
                    </div>

                    <div className='download-button'>
                        <a href='https://apps.apple.com/us/app/soundcloud/id336353151' target="_blank">
                            <img className='appStore-img' src='https://a-v2.sndcdn.com/assets/images/appstore_badge@en_2x-5a6e21e0.png'/>
                        </a>
                    </div>
                </div>
                <img src='../../public/splitwise-footer-img.png' alt='footer-image'/>
                
            </footer>
        </body>
        </>
    )
}

export default LandingPage

