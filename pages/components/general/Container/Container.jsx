import React from 'react'
import styles from './container.module.css'

export default function Container({
  custom_id,
  z,
  custom_class,
  wrap,
  custom_style = {},
  grow,
  flex_direction = { sm: 'row', md: 'row', lg: 'row', xl: 'row' },
  padding = { top: 0, left: 0, right: 0, bottom: 0 },
  margin = { top: 0, left: 0, right: 0, bottom: 0 },
  order = { sm: 1, md: 1, lg: 1, xl: 1 },
  display = { sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' },
  container_type,
  customClass,
  bg_color,
  min_height,
  height,
  min_width,
  width,
  horizontal,
  vertical,
  separate_items,
  hide_scrollbar,
  col = { sm: 0, md: 0, lg: 0, xl: 0 },
  children,
}) {
  var customStyle = {
    backgroundColor: bg_color,
    height: height,
    minHeight: min_height,
    zIndex: z,
  }

  for (var prop in custom_style) {
    customStyle[prop] = custom_style[prop]
  }

  return (
    <div
      style={customStyle}
      id={custom_id && custom_id}
      className={`
        
        position-relative

        ${hide_scrollbar && styles.hide_scrollbar}
        
        ${display['sm'] && 'd-' + display['sm']}
        ${display['sm'] && 'd-sm-' + display['sm']}
        ${display['md'] && 'd-md-' + display['md']}
        ${display['lg'] && 'd-lg-' + display['lg']}
        ${display['xl'] && 'd-xl-' + display['xl']}
        
        ${wrap && "flex-wrap"}

        ${grow >= 0 && 'flex-grow-' + grow}

        ${custom_class && custom_class}

        ${container_type == 'normal' && 'container'}
        ${container_type == 'fluid' && 'container-fluid'}

        ${customClass && customClass}
        
        p-0
        ${padding['top'] >= 0 && 'pt-' + padding['top']}
        ${padding['left'] >= 0 && 'pl-' + padding['left']}
        ${padding['right'] >= 0 && 'pr-' + padding['right']}
        ${padding['bottom'] >= 0 && 'pb-' + padding['bottom']}

        ${margin['top'] > 0 && 'mt-' + margin['top']}
        ${margin['left'] > 0 && 'ml-' + margin['left']}
        ${margin['right'] > 0 && 'mr-' + margin['right']}
        ${margin['bottom'] > 0 && 'mb-' + margin['bottom']}
        
        ${col['sm'] >= 0 && 'col-' + col['sm']}
        ${col['sm'] >= 0 && 'col-sm-' + col['sm']}
        ${col['md'] >= 0 && 'col-md-' + col['md']}
        ${col['lg'] >= 0 && 'col-lg-' + col['lg']}
        ${col['xl'] >= 0 && 'col-xl-' + col['xl']}
        ${col['sm'] == 'auto' && 'col'}
        ${col['sm'] == 'auto' && 'col-sm'}
        ${col['md'] == 'auto' && 'col-md'}
        ${col['lg'] == 'auto' && 'col-lg'}
        ${col['xl'] == 'auto' && 'col-xl'}

        ${order['sm'] && 'order-' + order['sm']}
        ${order['sm'] && 'order-sm-' + order['sm']}
        ${order['md'] && 'order-md-' + order['md']}
        ${order['lg'] && 'order-lg-' + order['lg']}
        ${order['xl'] && 'order-xl-' + order['xl']}

        ${flex_direction['sm'] == 'row' && 'flex-sm-row flex-row'}
        ${flex_direction['sm'] == 'column' && 'flex-sm-column flex-column'}
        ${flex_direction['md'] == 'row' && 'flex-md-row'}
        ${flex_direction['md'] == 'column' && 'flex-md-column'}
        ${flex_direction['lg'] == 'row' && 'flex-lg-row'}
        ${flex_direction['lg'] == 'column' && 'flex-lg-column'}
        ${flex_direction['xl'] == 'row' && 'flex-xl-row'}
        ${flex_direction['xl'] == 'column' && 'flex-xl-column'}

        ${((horizontal == 'start' && flex_direction['sm'] == 'column') ||
          (vertical == 'start' && flex_direction['sm'] == 'row')) &&
        'align-items-sm-start align-items-start'
        }
        ${((horizontal == 'middle' && flex_direction['sm'] == 'column') ||
          (vertical == 'middle' && flex_direction['sm'] == 'row')) &&
        'align-items-sm-center align-items-center'
        }
        ${((horizontal == 'end' && flex_direction['sm'] == 'column') ||
          (vertical == 'end' && flex_direction['sm'] == 'row')) &&
        'align-items-sm-end align-items-end'
        }
        ${((vertical == 'start' && flex_direction['sm'] == 'column') ||
          (horizontal == 'start' && flex_direction['sm'] == 'row')) &&
        'justify-content-sm-start justify-content-start'
        }
        ${((vertical == 'middle' && flex_direction['sm'] == 'column') ||
          (horizontal == 'middle' && flex_direction['sm'] == 'row')) &&
        'justify-content-sm-center justify-content-center'
        }
        ${((vertical == 'end' && flex_direction['sm'] == 'column') ||
          (horizontal == 'end' && flex_direction['sm'] == 'row')) &&
        'justify-content-sm-end justify-content-end'
        }
        
        ${((horizontal == 'start' && flex_direction['md'] == 'column') ||
          (vertical == 'start' && flex_direction['md'] == 'row')) &&
        'align-items-md-start'
        }
        ${((horizontal == 'middle' && flex_direction['md'] == 'column') ||
          (vertical == 'middle' && flex_direction['md'] == 'row')) &&
        'align-items-md-center'
        }
        ${((horizontal == 'end' && flex_direction['md'] == 'column') ||
          (vertical == 'end' && flex_direction['md'] == 'row')) &&
        'align-items-md-end'
        }
        ${((vertical == 'start' && flex_direction['md'] == 'column') ||
          (horizontal == 'start' && flex_direction['md'] == 'row')) &&
        'justify-content-md-start'
        }
        ${((vertical == 'middle' && flex_direction['md'] == 'column') ||
          (horizontal == 'middle' && flex_direction['md'] == 'row')) &&
        'justify-content-md-center'
        }
        ${((vertical == 'end' && flex_direction['md'] == 'column') ||
          (horizontal == 'end' && flex_direction['md'] == 'row')) &&
        'justify-content-md-end'
        }

        ${((horizontal == 'start' && flex_direction['lg'] == 'column') ||
          (vertical == 'start' && flex_direction['lg'] == 'row')) &&
        'align-items-lg-start'
        }
        ${((horizontal == 'middle' && flex_direction['lg'] == 'column') ||
          (vertical == 'middle' && flex_direction['lg'] == 'row')) &&
        'align-items-lg-center'
        }
        ${((horizontal == 'end' && flex_direction['lg'] == 'column') ||
          (vertical == 'end' && flex_direction['lg'] == 'row')) &&
        'align-items-lg-end'
        }
        ${((vertical == 'start' && flex_direction['lg'] == 'column') ||
          (horizontal == 'start' && flex_direction['lg'] == 'row')) &&
        'justify-content-lg-start'
        }
        ${((vertical == 'middle' && flex_direction['lg'] == 'column') ||
          (horizontal == 'middle' && flex_direction['lg'] == 'row')) &&
        'justify-content-lg-center'
        }
        ${((vertical == 'end' && flex_direction['lg'] == 'column') ||
          (horizontal == 'end' && flex_direction['lg'] == 'row')) &&
        'justify-content-lg-end'
        }

        ${((horizontal == 'start' && flex_direction['xl'] == 'column') ||
          (vertical == 'start' && flex_direction['xl'] == 'row')) &&
        'align-items-xl-start'
        }
        ${((horizontal == 'middle' && flex_direction['xl'] == 'column') ||
          (vertical == 'middle' && flex_direction['xl'] == 'row')) &&
        'align-items-xl-center'
        }
        ${((horizontal == 'end' && flex_direction['xl'] == 'column') ||
          (vertical == 'end' && flex_direction['xl'] == 'row')) &&
        'align-items-xl-end'
        }
        ${((vertical == 'start' && flex_direction['xl'] == 'column') ||
          (horizontal == 'start' && flex_direction['xl'] == 'row')) &&
        'justify-content-xl-start'
        }
        ${((vertical == 'middle' && flex_direction['xl'] == 'column') ||
          (horizontal == 'middle' && flex_direction['xl'] == 'row')) &&
        'justify-content-xl-center'
        }
        ${((vertical == 'end' && flex_direction['xl'] == 'column') ||
          (horizontal == 'end' && flex_direction['xl'] == 'row')) &&
        'justify-content-xl-end'
        }

        ${separate_items &&
        'justify-content-between justify-content-sm-between justify-content-md-between justify-content-lg-between justify-content-xl-between'
        }

        ${height == 'auto' && 'align-self-stretch'}
`}
    >
      {children}
    </div>
  )
}
