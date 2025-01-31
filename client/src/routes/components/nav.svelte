<script>
	import { onMount } from 'svelte';
	// import { appState } from '../js/state.svelte.js';
	import { page } from '$app/state';

	let isExpanded = $state(false);
	let theme = $state('light');

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.cookie = `theme=${theme}; path=/; max-age=31536000`;
		document.documentElement.setAttribute('data-theme', theme);
	}

	onMount(() => {
		theme = document.documentElement.getAttribute('data-theme');
	});
</script>

<nav class:isExpanded>
	<div class="nav-container" id="logo-container">
		<a href class="nav-font logo" onclick={() => (isExpanded = !isExpanded)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="40px"
				viewBox="0 -960 960 960"
				width="40px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="M653.33-160v-280H800v280H653.33Zm-246.66 0v-640h146.66v640H406.67ZM160-160v-440h146.67v440H160Z"
				/>
			</svg>
			{#if isExpanded}
				<span>Asphalt Workbench</span>
			{/if}
		</a>
	</div>

	<div class="nav-container" id="pages-container">
		<a class="nav-font {page.url.pathname === '/dashboard' ? 'active-nav' : ''}" href="/dashboard">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
				/>
			</svg>
			<span>Dashboard</span>
		</a>
		<a
			class="nav-font {page.url.pathname === '/worker/breakdown' ? 'active-nav' : ''}"
			href="/worker/breakdown"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="M42-120v-112q0-33 17-62t47-44q51-26 115-44t141-18q77 0 141 18t115 44q30 15 47 44t17 62v112H42Zm80-80h480v-32q0-11-5.5-20T582-266q-36-18-92.5-36T362-320q-71 0-127.5 18T142-266q-9 5-14.5 14t-5.5 20v32Zm240-240q-66 0-113-47t-47-113h-10q-9 0-14.5-5.5T172-620q0-9 5.5-14.5T192-640h10q0-45 22-81t58-57v38q0 9 5.5 14.5T302-720q9 0 14.5-5.5T322-740v-54q9-3 19-4.5t21-1.5q11 0 21 1.5t19 4.5v54q0 9 5.5 14.5T422-720q9 0 14.5-5.5T442-740v-38q36 21 58 57t22 81h10q9 0 14.5 5.5T552-620q0 9-5.5 14.5T532-600h-10q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T442-600H282q0 33 23.5 56.5T362-520Zm300 160-6-30q-6-2-11.5-4.5T634-402l-28 10-20-36 22-20v-24l-22-20 20-36 28 10q4-4 10-7t12-5l6-30h40l6 30q6 2 12 5t10 7l28-10 20 36-22 20v24l22 20-20 36-28-10q-5 5-10.5 7.5T708-390l-6 30h-40Zm20-70q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm72-130-8-42q-9-3-16.5-7.5T716-620l-42 14-28-48 34-30q-2-5-2-8v-16q0-3 2-8l-34-30 28-48 42 14q6-6 13.5-10.5T746-798l8-42h56l8 42q9 3 16.5 7.5T848-780l42-14 28 48-34 30q2 5 2 8v16q0 3-2 8l34 30-28 48-42-14q-6 6-13.5 10.5T818-602l-8 42h-56Zm28-90q21 0 35.5-14.5T832-700q0-21-14.5-35.5T782-750q-21 0-35.5 14.5T732-700q0 21 14.5 35.5T782-650ZM362-200Z"
				/>
			</svg>
			<span>Breakdown</span>
		</a>
		<a class="nav-font {page.url.pathname === '/support' ? 'active-nav' : ''}" href>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"
				/>
			</svg>
			<span>Support</span>
		</a>
		<a class="nav-font {page.url.pathname === '/calendar' ? 'active-nav' : ''}" href>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"
				/>
			</svg>
			<span>Calendar</span>
		</a>
		<a class="nav-font {page.url.pathname === '/admin' ? 'active-nav' : ''}" href>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="M480-440q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0-80q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0 440q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm0 515q-36 0-70 8t-65 22q29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8Z"
				/>
			</svg>
			<span>Admin panel</span>
		</a>

		<a class="nav-font {page.url.pathname === '/monitor' ? 'active-nav' : ''}" href>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
				/>
			</svg>
			<span>Monitor/ Time</span>
		</a>
	</div>

	<div class="nav-container" id="settings-container">
		<a href onclick={toggleTheme} id="dmode" class="nav-font hidden">
			{#if theme === 'light'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="black"
					class="nav-icon"
				>
					<path
						d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
					/>
				</svg>
				{#if isExpanded}
					<span>Dark Mode</span>
				{/if}
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="black"
					class="nav-icon"
				>
					<path
						d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"
					/>
				</svg>
				{#if isExpanded}
					<span>Light Mode</span>
				{/if}
			{/if}
		</a>
		<a class="nav-font {page.url.pathname === '/settings' ? 'active-nav' : ''}" href>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
				/>
			</svg>
			<span>Settings</span>
		</a>
		<!-- <a href="#" class="nav-font">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="black"
				class="nav-icon"
			>
				<path
					d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"
				/>
			</svg>
			{#if !isCollapsed}
				<span>Language</span>
			{/if}
		</a> -->
	</div>

	<!-- <div id="user-container">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="48px"
			viewBox="0 -960 960 960"
			width="48px"
			fill="#ababab"
			class="avatar"
		>
			<path
				d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.81-195q-57.81 0-97.31-39.69-39.5-39.68-39.5-97.5 0-57.81 39.69-97.31 39.68-39.5 97.5-39.5 57.81 0 97.31 39.69 39.5 39.68 39.5 97.5 0 57.81-39.69 97.31-39.68 39.5-97.5 39.5Zm.66 370Q398-80 325-111.5t-127.5-86q-54.5-54.5-86-127.27Q80-397.53 80-480.27 80-563 111.5-635.5q31.5-72.5 86-127t127.27-86q72.76-31.5 155.5-31.5 82.73 0 155.23 31.5 72.5 31.5 127 86t86 127.03q31.5 72.53 31.5 155T848.5-325q-31.5 73-86 127.5t-127.03 86Q562.94-80 480.47-80Zm-.47-60q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"
			/>
		</svg>
		<div id="user-info">
			<span class="role">Admin</span>
			<span id="username">Petar Jovanovic</span>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="32px"
			viewBox="0 -960 960 960"
			width="32px"
			fill="#ababab"
		>
			<path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z" />
		</svg>
	</div> -->
</nav>

<style>
	.isExpanded {
		width: 220px;
		> div > a > span {
			opacity: 1;
			background-color: transparent;
		}
	}
	nav {
		grid-area: nav;
		height: 100vh;
		border-right: 1px solid var(--main-dark);
		box-sizing: border-box;
		display: grid;
		grid-template-rows: auto 1fr auto;
		transition: all 0.2s;
	}

	.nav-font {
		/* width: 24px; */
		position: relative;
		font-family: var(--main-font);
		border-radius: 10px;
		font-size: 16px;
		font-weight: 500;
		color: var(--font-color);
		padding: 7px;
		text-decoration: none;
		transition: all 0.2s;

		> svg {
			transition: all 0.2s;
			z-index: 2;
		}

		&.active-nav {
			background-color: var(--light-green);
			color: var(--main-green);
			transition: all 0.2s;

			& svg {
				fill: var(--main-green);
				transition: all 0.2s;
			}
		}

		&:hover {
			background-color: var(--light-green);
			transition: all 0.2s;
		}

		> span {
			box-sizing: border-box;
			padding-left: 65px;
			background-color: var(--main-dark);
			top: 0;
			left: 0px;
			position: absolute;
			border-radius: inherit;
			line-height: 1;
			opacity: 0;
			pointer-events: none;
			width: 180px;
			height: 100%;
			display: flex;
			justify-content: left;
			align-items: center;
			transition: all 0.2s;
		}

		display: flex;
		align-items: center;
	}

	.nav-font:hover > span {
		transition: all 0.2s;
		opacity: 1;
		pointer-events: none;
	}

	.nav-container {
		box-sizing: border-box;
		padding-inline: 20px;
		gap: 20px;
		/* height: 100%; */
		display: flex;
		flex-direction: column;
		align-items: left;
		background-color: transparent;
	}

	#logo-container {
		padding: 20px;
	}

	#pages-container {
		padding-top: 30px;
	}

	#settings-container {
		height: 100%;
		padding-bottom: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: left;
	}

	/* #user-container {
		margin-top: auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		padding-bottom: 20px;
		cursor: pointer;

		& .avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}

		& #user-info {
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: left;
		}

		& #username {
			font-size: 16px;
			font-weight: 500;
		}

		& .role {
			color: var(--grey-font);
			font-size: 14px;
			font-weight: 500;
			padding: 0;
			margin: 0;
		}
	} */

	.logo {
		height: 40px;
		font-weight: 600;
		color: var(--main-green);

		& .nav-icon {
			fill: var(--main-green);
			margin: 0;
			height: 24px;
			width: 24px;
		}
	}
</style>
