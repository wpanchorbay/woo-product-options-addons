import React, {
	useState,
	useRef,
	useEffect,
	KeyboardEvent,
	useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Lock, Hourglass, X } from 'lucide-react';
import { SelectOption } from '../../utils/types';
import apiFetch from '@wordpress/api-fetch';

// Hook for click outside
function useClickOutside(
	refs: React.RefObject< HTMLElement >[],
	handler: ( event: MouseEvent | TouchEvent ) => void
) {
	useEffect( () => {
		const listener = ( event: MouseEvent | TouchEvent ) => {
			// If any ref contains the target, don't trigger handler
			const isInside = refs.some(
				( ref ) =>
					ref.current && ref.current.contains( event.target as Node )
			);
			if ( isInside ) {
				return;
			}
			handler( event );
		};
		document.addEventListener( 'mousedown', listener );
		document.addEventListener( 'touchstart', listener );
		return () => {
			document.removeEventListener( 'mousedown', listener );
			document.removeEventListener( 'touchstart', listener );
		};
	}, [ refs, handler ] );
}

export interface ClassicSelectClassNames {
	container?: string;
	label?: string;
	innerContainer?: string;
	trigger?: string;
	triggerOpen?: string;
	triggerDisabled?: string;
	value?: string;
	dropdown?: string;
	searchContainer?: string;
	searchInput?: string;
	list?: string;
	option?: string;
	optionHighlighted?: string;
	optionSelected?: string;
	description?: string;
}

interface ClassicSelectProps {
	id?: string;
	value: SelectOption[ 'value' ] | null;
	onChange: ( value: string | number ) => void;
	options: SelectOption[];
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	classNames?: ClassicSelectClassNames;
	label?: string;
	description?: string;
	enableSearch?: boolean;
	size?: 'short' | 'regular';
	renderOption?: ( option: SelectOption ) => React.ReactNode;
	differentDropdownWidth?: boolean;
	endpoint?: string;
	dropdownHeader?: React.ReactNode;
	dropdownFooter?: React.ReactNode;
	allowClear?: boolean;
	isError?: boolean;
}

export const ClassicSelect: React.FC< ClassicSelectProps > = ( {
	id,
	value,
	onChange,
	options,
	placeholder = 'Select an option...',
	disabled = false,
	className = '',
	classNames,
	label,
	description,
	enableSearch = false,
	size = 'short',
	renderOption,
	differentDropdownWidth = false,
	endpoint,
	dropdownHeader,
	dropdownFooter,
	allowClear = false,
	isError = false,
} ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ highlightedIndex, setHighlightedIndex ] = useState< number >( -1 );
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ apiOptions, setApiOptions ] = useState< SelectOption[] >( [] );
	const [ allSeenOptions, setAllSeenOptions ] = useState< SelectOption[] >(
		options || []
	);
	const [ isLoading, setIsLoading ] = useState( false );
	const initialFetchDone = useRef( false );

	const containerRef = useRef< HTMLDivElement >( null );
	const dropdownRef = useRef< HTMLDivElement >( null );
	const listRef = useRef< HTMLUListElement >( null );
	const searchInputRef = useRef< HTMLInputElement >( null );
	const interactionType = useRef< 'mouse' | 'keyboard' >( 'keyboard' );

	// Portal coordinates
	const [ coords, setCoords ] = useState( { top: 0, left: 0, width: 0 } );

	// Tooltip state for buy_pro
	const [ tooltipState, setTooltipState ] = useState< {
		visible: boolean;
		top: number;
		left: number;
		width: number | 'max-content';
		text: string;
	} | null >( null );
	const hoverTimeoutRef = useRef< number | null >( null );

	useClickOutside( [ containerRef, dropdownRef ], () => {
		setIsOpen( false );
		setTooltipState( null );
	} );

	const selectedOption = useMemo( () => {
		const lookupSource = endpoint ? allSeenOptions : options;
		return lookupSource.find( ( opt ) => opt.value === value ) || null;
	}, [ options, allSeenOptions, value, endpoint ] );

	// Merge fetched options into allSeenOptions so selected items keep their labels
	useEffect( () => {
		if ( apiOptions.length > 0 ) {
			setAllSeenOptions( ( prev ) => {
				const map = new Map( prev.map( ( o ) => [ o.value, o ] ) );
				apiOptions.forEach( ( o: any ) => {
					// Normalize: ensure it has value and label
					const normalized = {
						...o,
						value: o.value !== undefined ? o.value : o.id,
						label: o.label !== undefined ? o.label : o.name || o.title || '',
					};
					map.set( normalized.value, normalized );
				} );
				return Array.from( map.values() );
			} );
		}
	}, [ apiOptions ] );

	// Merge parent options into allSeenOptions when options prop changes
	useEffect( () => {
		if ( options && options.length > 0 ) {
			setAllSeenOptions( ( prev ) => {
				const map = new Map( prev.map( ( o ) => [ o.value, o ] ) );
				options.forEach( ( o ) => map.set( o.value, o ) );
				return Array.from( map.values() );
			} );
		}
	}, [ options ] );

	// Initial fetch when component mounts with pre-selected value
	useEffect( () => {
		if (
			! endpoint ||
			initialFetchDone.current ||
			value === null ||
			value === undefined
		) {
			return;
		}
		initialFetchDone.current = true;

		const separator = endpoint.includes( '?' ) ? '&' : '?';
		// Use direct ID endpoint if possible, or fallback to ids= query
		const path = endpoint.includes( '%' ) || endpoint.includes( '?' ) 
			? `${ endpoint }${ separator }ids=${ value }`
			: `${ endpoint.replace( /\/+$/, '' ) }/${ value }`;

		apiFetch( { path, method: 'GET' } )
			.then( ( res: any ) => {
				const data = res?.data || res || [];
				const item = Array.isArray( data ) ? data[ 0 ] : data;
				if ( item ) {
					// Normalize single item
					const normalized = {
						...item,
						value: item.value !== undefined ? item.value : item.id,
						label: item.label !== undefined ? item.label : item.name || item.title || '',
					};

					setAllSeenOptions( ( prev ) => {
						const map = new Map(
							prev.map( ( o ) => [ o.value, o ] )
						);
						map.set( normalized.value, normalized );
						return Array.from( map.values() );
					} );
				}
			} )
			.catch( () => {} );
	}, [ endpoint, value ] );

	const effectiveOptions = useMemo( () => {
		if ( ! endpoint ) {
			return options;
		}
		const map = new Map( options.map( ( o ) => [ o.value, o ] ) );
		apiOptions.forEach( ( o ) => map.set( o.value, o ) );
		return Array.from( map.values() );
	}, [ options, apiOptions, endpoint ] );

	useEffect( () => {
		if ( ! endpoint || ! isOpen ) {
			return;
		}

		let active = true;
		const delayDebounceFn = setTimeout( async () => {
			try {
				setIsLoading( true );
				const separator = endpoint.includes( '?' ) ? '&' : '?';
				const path = `${ endpoint }${ separator }search=${ encodeURIComponent(
					searchQuery
				) }`;

				const res: any = await apiFetch( { path, method: 'GET' } );

				if ( active ) {
					const data = res?.data || res || [];
					const normalizedData = Array.isArray( data ) 
						? data.map( ( o: any ) => ( {
							...o,
							value: o.value !== undefined ? o.value : o.id,
							label: o.label !== undefined ? o.label : o.name || o.title || '',
						} ) )
						: [];

					setApiOptions( normalizedData );
					setIsLoading( false );
				}
			} catch {
				if ( active ) {
					setIsLoading( false );
				}
			}
		}, 300 );

		return () => {
			active = false;
			clearTimeout( delayDebounceFn );
		};
	}, [ endpoint, searchQuery, isOpen ] );

	const filteredOptions = useMemo( () => {
		if ( endpoint ) {
			return effectiveOptions;
		}
		if ( ! enableSearch || ! searchQuery ) {
			return effectiveOptions;
		}
		return effectiveOptions.filter( ( opt ) =>
			opt.label.toLowerCase().includes( searchQuery.toLowerCase() )
		);
	}, [ effectiveOptions, searchQuery, enableSearch, endpoint ] );

	const updateCoords = () => {
		if ( ! containerRef.current ) {
			return;
		}
		const rect = containerRef.current.getBoundingClientRect();
		setCoords( {
			top: rect.bottom,
			left: rect.left,
			width: rect.width,
		} );
	};

	useEffect( () => {
		if ( isOpen ) {
			updateCoords();
			window.addEventListener( 'scroll', updateCoords, true );
			window.addEventListener( 'resize', updateCoords );
		}
		return () => {
			window.removeEventListener( 'scroll', updateCoords, true );
			window.removeEventListener( 'resize', updateCoords );
		};
	}, [ isOpen ] );

	useEffect( () => {
		if ( isOpen ) {
			if ( enableSearch && searchInputRef.current ) {
				requestAnimationFrame( () => searchInputRef.current?.focus() );
			}
			const selectedIndex = value
				? filteredOptions.findIndex( ( opt ) => opt.value === value )
				: 0;
			setHighlightedIndex( selectedIndex >= 0 ? selectedIndex : 0 );
			interactionType.current = 'keyboard';
		} else {
			setSearchQuery( '' );
			setTooltipState( null );
		}
	}, [ isOpen, value, enableSearch, filteredOptions.length ] );

	useEffect( () => {
		if (
			isOpen &&
			listRef.current &&
			highlightedIndex >= 0 &&
			interactionType.current === 'keyboard'
		) {
			const list = listRef.current;
			const element = list.children[ highlightedIndex ] as HTMLElement;
			if ( element ) {
				const listTop = list.scrollTop;
				const listBottom = listTop + list.clientHeight;
				const elementTop = element.offsetTop;
				const elementBottom = elementTop + element.offsetHeight;
				if ( elementTop < listTop ) {
					list.scrollTop = elementTop;
				} else if ( elementBottom > listBottom ) {
					list.scrollTop = elementBottom - list.clientHeight;
				}
			}
		}
	}, [ highlightedIndex, isOpen ] );

	const handleSelect = ( option: SelectOption ) => {
		if (
			option.disabled ||
			option.variant === 'buy_pro' ||
			option.variant === 'coming_soon'
		) {
			return;
		}
		onChange( option.value );
		setIsOpen( false );
		setSearchQuery( '' );
		setTooltipState( null );
	};

	const handleTriggerKeyDown = ( e: KeyboardEvent< HTMLDivElement > ) => {
		if ( disabled ) {
			return;
		}
		if ( isOpen && enableSearch ) {
			return;
		}

		interactionType.current = 'keyboard';
		switch ( e.key ) {
			case 'Enter':
			case ' ':
				e.preventDefault();
				if ( isOpen ) {
					if ( filteredOptions[ highlightedIndex ] ) {
						handleSelect( filteredOptions[ highlightedIndex ] );
					}
				} else {
					setIsOpen( ! isOpen );
				}
				break;
			case 'ArrowDown':
				e.preventDefault();
				if ( ! isOpen ) {
					setIsOpen( true );
				} else {
					setHighlightedIndex( ( prev ) =>
						prev < filteredOptions.length - 1 ? prev + 1 : 0
					);
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				if ( ! isOpen ) {
					setIsOpen( true );
				} else {
					setHighlightedIndex( ( prev ) =>
						prev > 0 ? prev - 1 : filteredOptions.length - 1
					);
				}
				break;
			case 'Escape':
				if ( isOpen ) {
					e.preventDefault();
					setIsOpen( false );
				}
				break;
		}
	};

	const handleSearchKeyDown = ( e: KeyboardEvent< HTMLInputElement > ) => {
		interactionType.current = 'keyboard';
		switch ( e.key ) {
			case 'ArrowDown':
				e.preventDefault();
				setHighlightedIndex( ( prev ) =>
					prev < filteredOptions.length - 1 ? prev + 1 : 0
				);
				break;
			case 'ArrowUp':
				e.preventDefault();
				setHighlightedIndex( ( prev ) =>
					prev > 0 ? prev - 1 : filteredOptions.length - 1
				);
				break;
			case 'Enter':
				e.preventDefault();
				if ( filteredOptions[ highlightedIndex ] ) {
					handleSelect( filteredOptions[ highlightedIndex ] );
				}
				break;
			case 'Escape':
				e.preventDefault();
				setIsOpen( false );
				break;
		}
	};

	const handleOptionHover = (
		e: React.MouseEvent< HTMLLIElement >,
		index: number,
		option: SelectOption
	) => {
		interactionType.current = 'mouse';
		setHighlightedIndex( index );
		if ( hoverTimeoutRef.current ) {
			clearTimeout( hoverTimeoutRef.current );
		}

		if (
			option.variant === 'buy_pro' ||
			option.variant === 'coming_soon'
		) {
			const rect = e.currentTarget.getBoundingClientRect();
			setTooltipState( {
				visible: true,
				top: rect.top,
				left: rect.left + rect.width / 2,
				width: rect.width,
				text:
					option.variant === 'buy_pro'
						? 'Available in Pro Version'
						: 'Coming Soon',
			} );
		} else {
			setTooltipState( null );
		}
	};

	const selectId = useMemo(
		() => id || `classic-select-${ Math.random().toString( 36 ).slice( 2, 9 ) }`,
		[ id ]
	);
	const sizeClass = size === 'short' ? 'min-content' : '';
	const explicitWidth =
		size === 'short' ? 'min-content' : size === 'regular' ? 'auto' : '100%';

	return (
		<div
			className={ `${ sizeClass } ${ className } ${
				classNames?.container || ''
			} wpab-wpoa-align-middle`.trim() }
			ref={ containerRef }
		>
			{ label && (
				<label
					htmlFor={ selectId }
					className={ `wpab-wpoa-block wpab-wpoa-mb-1 ${
						classNames?.label || ''
					}`.trim() }
				>
					{ label }
				</label>
			) }

			<div
				className={ `wpab-wpoa-relative ${ classNames?.innerContainer }` }
				style={ { width: explicitWidth } }
			>
				{ /* Trigger that looks like WP native select */ }
				<div
					id={ selectId }
					tabIndex={ disabled ? -1 : 0 }
					role="combobox"
					aria-expanded={ isOpen }
					onClick={ () => ! disabled && setIsOpen( ! isOpen ) }
					onKeyDown={ handleTriggerKeyDown }
					className={ `
            wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-justify-between 
            wpab-wpoa-appearance-none wpab-wpoa-border wpab-wpoa-border-[#8c8f94] 
            wpab-wpoa-rounded-[3px] wpab-wpoa-px-2 wpab-wpoa-pr-6 wpab-wpoa-min-h-[30px] 
            wpab-wpoa-leading-loose wpab-wpoa-transition-all wpab-wpoa-duration-100 
            wpab-wpoa-select-none wpab-wpoa-relative wpab-wpoa-box-border wpab-wpoa-w-full 
            ${
				disabled
					? `wpab-wpoa-cursor-not-allowed wpab-wpoa-bg-[#f0f0f1] wpab-wpoa-text-[#a7aaad] ${
							classNames?.triggerDisabled || ''
					  }`
					: `wpab-wpoa-cursor-pointer wpab-wpoa-bg-white wpab-wpoa-text-[#2c3338]`
			} 
            ${
				isOpen
					? `!wpab-wpoa-border-[#2271b1] wpab-wpoa-shadow-[0_0_0_1px_#2271b1] wpab-wpoa-outline-none ${
							classNames?.triggerOpen || ''
					  }`
					: 'wpab-wpoa-shadow-none'
			} 
            ${
				isError && ! isOpen
					? '!wpab-wpoa-border-red-400 !wpab-wpoa-shadow-none'
					: ''
			}
            ${ classNames?.trigger || '' }
          `.trim() }
				>
					<span
						className={ `wpab-wpoa-flex-1 ${
							! renderOption
								? 'wpab-wpoa-overflow-hidden wpab-wpoa-text-ellipsis wpab-wpoa-whitespace-nowrap'
								: ''
						} ${ classNames?.value || '' }`.trim() }
					>
						{ selectedOption
							? renderOption
								? renderOption( selectedOption )
								: selectedOption.label
							: placeholder }
					</span>

					<div className="wpab-wpoa-absolute wpab-wpoa-right-1.5 wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-gap-1">
						{ allowClear && value !== null && ! disabled && (
							<button
								onClick={ ( e ) => {
									e.stopPropagation();
									onChange( '' );
								} }
								className="wpab-wpoa-p-0.5 wpab-wpoa-bg-transparent wpab-wpoa-border-none wpab-wpoa-text-[#8c8f94] hover:wpab-wpoa-text-red-500 wpab-wpoa-cursor-pointer wpab-wpoa-flex wpab-wpoa-items-center"
							>
								<X size={ 12 } />
							</button>
						) }
						<ChevronDown size={ 14 } color="#50575e" />
					</div>
				</div>

				{ /* Dropdown Menu */ }
				{ isOpen &&
					createPortal(
						<div
							ref={ dropdownRef }
							className={ `wpab-wpoa-fixed wpab-wpoa-z-[999999] wpab-wpoa-bg-white wpab-wpoa-border-2 wpab-wpoa-border-[#2271b1] ${
								differentDropdownWidth
									? 'wpab-wpoa-rounded-[3px]'
									: 'wpab-wpoa-border-t-0 wpab-wpoa-mt-[-3px] wpab-wpoa-rounded-b-[3px]'
							} 
              wpab-wpoa-rounded-b-[3px] wpab-wpoa-shadow-[0_3px_5px_rgba(0,0,0,0.2)] wpab-wpoa-p-0 wpab-wpoa-box-border ${
					classNames?.dropdown || ''
				}`.trim() }
							style={ {
								top: coords.top,
								left: coords.left - 1, // Offset for border alignment
								width: coords.width + 2, // Compensate for border
								...( differentDropdownWidth
									? { width: 'max-content' }
									: {} ),
							} }
						>
							{ dropdownHeader && (
								<div className="wpab-wpoa-border-b wpab-wpoa-border-[#ccd0d4]">
									{ dropdownHeader }
								</div>
							) }

							{ enableSearch && (
								<div
									className={ `wpab-wpoa-p-1.5 ${
										classNames?.searchContainer || ''
									}`.trim() }
								>
									<input
										ref={ searchInputRef }
										type="text"
										value={ searchQuery }
										onChange={ ( e ) => {
											setSearchQuery( e.target.value );
											setHighlightedIndex( 0 );
										} }
										onKeyDown={ handleSearchKeyDown }
										onClick={ ( e ) => e.stopPropagation() }
										placeholder="Search..."
										className={ `wpab-wpoa-w-full wpab-wpoa-px-2 wpab-wpoa-leading-loose wpab-wpoa-min-h-[26px] wpab-wpoa-border wpab-wpoa-border-[#aaaaaa] wpab-wpoa-bg-[#fcfcfc] wpab-wpoa-rounded-[3px] wpab-wpoa-box-border wpab-wpoa-text-[13px] focus:wpab-wpoa-outline-none focus:wpab-wpoa-shadow-none ${
											classNames?.searchInput || ''
										}`.trim() }
									/>
								</div>
							) }

							<ul
								ref={ listRef }
								role="listbox"
								className={ `wpab-wpoa-max-h-[220px] wpab-wpoa-overflow-y-auto wpab-wpoa-m-0 wpab-wpoa-p-0 wpab-wpoa-list-none ${
									classNames?.list || ''
								}`.trim() }
								style={ {
									scrollbarWidth: 'thin',
								} }
							>
								{ isLoading ? (
									<li className="wpab-wpoa-px-3 wpab-wpoa-py-3 wpab-wpoa-text-[#646970] wpab-wpoa-text-[13px] wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-gap-2 wpab-wpoa-justify-center">
										<Hourglass
											size={ 14 }
											className="wpab-wpoa-animate-spin"
										/>
										Loading...
									</li>
								) : filteredOptions.length === 0 ? (
									<li className="wpab-wpoa-px-3 wpab-wpoa-py-1.5 wpab-wpoa-text-[#646970] wpab-wpoa-italic wpab-wpoa-text-[13px] wpab-wpoa-m-0">
										{ searchQuery
											? 'No results found'
											: 'No options available' }
									</li>
								) : (
									filteredOptions.map( ( opt, index ) => {
										const isSelected =
											selectedOption?.value === opt.value;
										const isHighlighted =
											highlightedIndex === index;
										const isPro = opt.variant === 'buy_pro';
										const isComingSoon =
											opt.variant === 'coming_soon';
										const isDisabled =
											opt.disabled ||
											isPro ||
											isComingSoon;

										return (
											<li
												key={ opt.value }
												role="option"
												aria-selected={ isSelected }
												onMouseEnter={ ( e ) =>
													handleOptionHover(
														e,
														index,
														opt
													)
												}
												onMouseLeave={ () => {
													hoverTimeoutRef.current =
														window.setTimeout(
															() =>
																setTooltipState(
																	null
																),
															150
														);
												} }
												onClick={ ( e ) => {
													e.stopPropagation();
													handleSelect( opt );
												} }
												className={ `
                        wpab-wpoa-px-3 wpab-wpoa-py-1.5 wpab-wpoa-flex wpab-wpoa-items-center 
                        wpab-wpoa-justify-between wpab-wpoa-text-[13px] wpab-wpoa-m-0 
                        ${
							isDisabled
								? 'wpab-wpoa-cursor-not-allowed'
								: 'wpab-wpoa-cursor-pointer'
						} 
                        ${
							isHighlighted
								? `wpab-wpoa-bg-[#2271b1] wpab-wpoa-text-white ${
										classNames?.optionHighlighted || ''
								  }`
								: isDisabled
								? 'wpab-wpoa-bg-transparent wpab-wpoa-text-[#a7aaad]'
								: `wpab-wpoa-bg-transparent wpab-wpoa-text-[#2c3338]`
						} 
                        ${ isSelected ? classNames?.optionSelected || '' : '' }
                        ${ classNames?.option || '' }
                      `.trim() }
											>
												<div className="wpab-wpoa-flex-1 wpab-wpoa-overflow-hidden">
													{ renderOption
														? renderOption( opt )
														: opt.label }
												</div>

												{ /* Icons for variants */ }
												{ isPro && (
													<span
														className={ `wpab-wpoa-ml-2 wpab-wpoa-flex ${
															isHighlighted
																? 'wpab-wpoa-text-white'
																: 'wpab-wpoa-text-[#ffb900]'
														}` }
													>
														<Lock size={ 14 } />
													</span>
												) }
												{ isComingSoon && (
													<span
														className={ `wpab-wpoa-ml-2 wpab-wpoa-text-[10px] wpab-wpoa-uppercase wpab-wpoa-px-1.5 wpab-wpoa-py-0.5 wpab-wpoa-rounded-[10px] wpab-wpoa-font-semibold wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-gap-1 ${
															isHighlighted
																? 'wpab-wpoa-bg-white/20 wpab-wpoa-text-white'
																: 'wpab-wpoa-bg-[#f0f0f1] wpab-wpoa-text-[#646970]'
														}` }
													>
														<Hourglass
															size={ 10 }
														/>
														Soon
													</span>
												) }
											</li>
										);
									} )
								) }
							</ul>

							{ dropdownFooter && (
								<div className="wpab-wpoa-border-t wpab-wpoa-border-[#ccd0d4]">
									{ dropdownFooter }
								</div>
							) }
						</div>
,
						document.body
					) }
			</div>

			{ description && (
				<p
					className={ `description wpab-wpoa-mt-1 ${
						classNames?.description || ''
					}`.trim() }
				>
					{ description }
				</p>
			) }

			{ /* Portal Tooltip or absolute Tooltip for variants */ }
			{ tooltipState?.visible && (
				<div
					className="wpab-wpoa-fixed wpab-wpoa-bg-[#1d2327] wpab-wpoa-text-white wpab-wpoa-px-2.5 wpab-wpoa-py-1 wpab-wpoa-rounded-[3px] wpab-wpoa-text-[12px] wpab-wpoa-pointer-events-none wpab-wpoa-z-[100000] wpab-wpoa-whitespace-nowrap"
					style={ {
						top: tooltipState.top - 8,
						left: tooltipState.left,
						transform: 'translate(-50%, -100%)',
					} }
				>
					{ tooltipState.text }
					{ /* Tooltip caret */ }
					<div className="wpab-wpoa-absolute -wpab-wpoa-bottom-1 wpab-wpoa-left-1/2 -wpab-wpoa-translate-x-1/2 wpab-wpoa-border-x-4 wpab-wpoa-border-t-4 wpab-wpoa-border-x-transparent wpab-wpoa-border-b-transparent wpab-wpoa-border-t-[#1d2327]" />
				</div>
			) }
		</div>
	);
};
