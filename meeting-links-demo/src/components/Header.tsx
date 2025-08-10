import React from "react"
import "./Header.css"

interface HeaderProps {
    meetingId: string
}

export default function Header({meetingId}: HeaderProps): React.JSX.Element {
  return (
    <header>
      Meeting ID: {meetingId}
    </header>
  )
}
