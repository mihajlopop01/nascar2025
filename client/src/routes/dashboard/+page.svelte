
<script>
    import { onMount } from 'svelte';
    import Nav from './components/nav.svelte';
    import Header from './components/header.svelte';

    let selectedNav = $state("dashboard");

    function toggleCard(card) {
            card.classList.toggle('expanded');
        }


    onMount(async () => {
            document.querySelectorAll('.hidden-content button').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
    });


</script>


<svelte:head>
    <title>Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</svelte:head>


<div id="page">
    <Header {selectedNav} />
    <Nav bind:selectedNav = {selectedNav}/>

    {#if selectedNav === "dashboard"}
        <main>
            <div id="main-section" class="dash-section">

                <div id="main-header">
                    <div class="main-header-button">
                        <button class="inactive-button">My cars</button>
                    </div>
                    <div class="main-header-button">
                        <button class="active-button">All cars</button>
                    </div>
                    <div class="main-header-button">
                        <button class="inactive-button">NA cars</button>
                    </div>
                    <div class="main-header-button">
                        <button class="inactive-button" id="selection-button">Edit</button>
                    </div>
                </div>
                <hr class="divider">


                

                <div id="pit-container-wrapper">
                    <div id="pitstop-cards-container">

                        <div class="pit-card-new">

                            <div class="pit-card-new-info">
                                <span class="car-num">16</span><span class="car-prior">[1.1]</span><span
                                    class="ass-unass">Petar Jovanovic</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="280 -680 400 400"
                                    width="16px" fill="black" class="dots-menu">
                                    <path
                                        d="M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z" />
                                </svg>
                            </div>

                            <!-- pit header -->
                            <div class="grid-table">
                                <div class="grid-header">No.</div>
                                <div class="grid-header">Lap</div>
                                <div class="grid-header">Time</div>
                                <div class="grid-header">Type</div>
                                <div class="grid-header">Dur</div>
                                <div class="grid-header">State</div>
                            </div>

                            <!-- data -->
                            <div class="grid-table">

                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">1.</div>
                                    <div class="grid-card-content">12</div>
                                    <div class="grid-card-content">20:43</div>
                                    <div class="grid-card-content">4W</div>
                                    <div class="grid-card-content">10.8s</div>
                                    <div class="grid-card-content indicator blinking1">🟡</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>


                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">2.</div>
                                    <div class="grid-card-content">13</div>
                                    <div class="grid-card-content">21:00</div>
                                    <div class="grid-card-content">2RS</div>
                                    <div class="grid-card-content">5.6s</div>
                                    <div class="grid-card-content indicator blinking1">🟢</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>


                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">3.</div>
                                    <div class="grid-card-content">14</div>
                                    <div class="grid-card-content">21:33</div>
                                    <div class="grid-card-content">4W</div>
                                    <div class="grid-card-content">11.2s</div>
                                    <div class="grid-card-content indicator">🟢</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>


                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">4.</div>
                                    <div class="grid-card-content">15</div>
                                    <div class="grid-card-content">22:45</div>
                                    <div class="grid-card-content">4W</div>
                                    <div class="grid-card-content">10.3s</div>
                                    <div class="grid-card-content indicator">🟢</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="pit-card-new">

                            <div class="pit-card-new-info">
                                <span class="car-num">42</span><span class="car-prior">[1.3]</span><span
                                    class="ass-unass">Nikola Trajkovic</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="280 -680 400 400"
                                    width="16px" fill="black" class="dots-menu">
                                    <path
                                        d="M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z" />
                                </svg>

                            </div>

                            <!-- pit header -->
                            <div class="grid-table">
                                <div class="grid-header">No.</div>
                                <div class="grid-header">Lap</div>
                                <div class="grid-header">Time</div>
                                <div class="grid-header">Type</div>
                                <div class="grid-header">Dur</div>
                                <div class="grid-header">State</div>
                            </div>

                            <!-- data -->
                            <div class="grid-table">

                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">1.</div>
                                    <div class="grid-card-content">12</div>
                                    <div class="grid-card-content">20:43</div>
                                    <div class="grid-card-content">4W</div>
                                    <div class="grid-card-content">10.8s</div>
                                    <div class="grid-card-content indicator blinking1">🔴</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>


                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">2.</div>
                                    <div class="grid-card-content">13</div>
                                    <div class="grid-card-content">21:00</div>
                                    <div class="grid-card-content">2RS</div>
                                    <div class="grid-card-content">5.6s</div>
                                    <div class="grid-card-content indicator blinking1">🟡</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>


                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">3.</div>
                                    <div class="grid-card-content">14</div>
                                    <div class="grid-card-content">21:33</div>
                                    <div class="grid-card-content">4W</div>
                                    <div class="grid-card-content">11.2s</div>
                                    <div class="grid-card-content indicator">🟢</div>
                                    <div class="hidden-content">
                                        <button class="edit-button">Edit</button>
                                    </div>
                                </div>



                            </div>


                        </div>
                        <div class="pit-card-new">

                            <div class="pit-card-new-info">
                                <span class="car-num">23</span><span class="car-prior">[3.0]</span><span
                                    class="ass-unass">Mihailo Jovanovic</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="280 -680 400 400"
                                    width="16px" fill="black" class="dots-menu">
                                    <path
                                        d="M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z" />
                                </svg>
                            </div>

                            <!-- pit header -->
                            <div class="grid-table">
                                <div class="grid-header">No.</div>
                                <div class="grid-header">Lap</div>
                                <div class="grid-header">Time</div>
                                <div class="grid-header">Type</div>
                                <div class="grid-header">Dur</div>
                                <div class="grid-header">State</div>
                            </div>

                            <!-- data -->
                            <div class="grid-table">

                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">1.</div>
                                    <div class="grid-card-content">12</div>
                                    <div class="grid-card-content">20:43</div>
                                    <div class="grid-card-content">4W</div>
                                    <div class="grid-card-content">10.8s</div>
                                    <div class="grid-card-content indicator blinking1">🔴</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>


                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">2.</div>
                                    <div class="grid-card-content">13</div>
                                    <div class="grid-card-content">21:00</div>
                                    <div class="grid-card-content">2RS</div>
                                    <div class="grid-card-content">5.6s</div>
                                    <div class="grid-card-content indicator blinking1">🟢</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>


                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">3.</div>
                                    <div class="grid-card-content">14</div>
                                    <div class="grid-card-content">21:33</div>
                                    <div class="grid-card-content">4W</div>
                                    <div class="grid-card-content">11.2s</div>
                                    <div class="grid-card-content indicator">🟢</div>
                                    <div class="hidden-content">
                                        <button class="edit-button">Edit</button>
                                    </div>
                                </div>


                                <div class="grid-card" onclick={toggleCard(this)}>
                                    <div class="grid-card-content">4.</div>
                                    <div class="grid-card-content">15</div>
                                    <div class="grid-card-content">22:45</div>
                                    <div class="grid-card-content">4W</div>
                                    <div class="grid-card-content">10.3s</div>
                                    <div class="grid-card-content indicator">🟢</div>
                                    <div class="hidden-content">
                                        <button>Work</button>
                                        <button>Report</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="pit-card-new">

                            <div class="pit-card-new-info">
                                <span class="car-num">12</span><span class="car-prior">[2.0]</span><span
                                    class="ass-unass">Unassigned</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="280 -680 400 400"
                                    width="16px" fill="black" class="dots-menu">
                                    <path
                                        d="M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z" />
                                </svg>
                            </div>



                            <!-- data -->
                            <div class="grid-table">
                                <div class="placeholder">
                                    <p>No pitstops yet.</p>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>

                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p id="modalMessage"></p>
                    </div>
                </div>

                <div id="notif-modal" class="modal">
                    <div id="notif-modal-content">
                        <span class="close">&times;</span>
                        <p id="notif-modal-message"></p>
                    </div>
                </div>




            </div>

            <!-- desni deo -->
            <div id="race-section" class="dash-section">
            </div>

            <div id="notif-section" class="dash-section">
                <button style="display:block" id="notif_button">Enable Notifications</button>
                <button style="display:none" id="notif_off_button">Disable Notifications</button>
            </div>

        </main>
    {:else if selectedNav === "breakdown"}
        <div>breakdown</div>
    {/if}

</div>


<style src="./dashboard.css" ></style>
