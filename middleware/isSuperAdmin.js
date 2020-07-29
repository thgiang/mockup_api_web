export default function (context) {
  if(!context.$auth.loggedIn || (context.$auth.loggedIn && !context.$auth.user.is_super_admin)) {
    return context.redirect('/')
  }
}
