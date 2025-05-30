import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import Patient from "@/models/Patient";
import User from "@/models/User";
import connectDB from "@/database/connectDB";

export const authOptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
  ],
 
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "github") {
          // Connect to the database
          await connectDB(); // Sirf connectDB() call karo, mongoose.connect() ki zarurat nahi
          
          // Check if the user already exists in the database
          const currentUser = await User.findOne({ email: user.email });
          
          // Fix: Ternary operator sahi tarike se use karo
          console.log(
            "😄 Current User " + (currentUser ? currentUser?.username : "No user found")
          );
          
          if (!currentUser) {
            // Create a new user
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
            });
            console.log(
            "😍 New User " + (newUser ? newUser?.username : "No user Added")
          );
            await newUser.save();
            // user.username = newUser.username;
          } 
          // else {
          //   // User already exists, fetch the username
          //   user.username = currentUser.username;
          // }
        }
        return true;
      } catch (error) {
        console.log(`Error Message: ${error}`);
        return false;
      }
    },
    
    async session({ session, user, token }) {
      try {
        // Database connection ensure karo
        await connectDB();
        
        const dbUser = await User.findOne({ email: session.user.email });
        
        if (dbUser) {
          session.user.name = dbUser.username;
          // session.user.username = dbUser.username; // Agar tumhe username property bhi chahiye
        } else {
          console.log("User not found in DB during session");
        }
        
        return session;
      } catch (error) {
        console.log(`Session error: ${error}`);
        return session; // Error case mein bhi session return karo
      }
    },
  },
});

export { authOptions as GET, authOptions as POST };