
import { cx, css } from '@emotion/css'

export default Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        data-test-id="menu"
        ref={ref}
        className={cx(
            className,
            css`
            & > * {
              display: inline-block;
            }
            & > * + * {
              margin-left: 15px;
            }
          `
        )}
    />
)
)

